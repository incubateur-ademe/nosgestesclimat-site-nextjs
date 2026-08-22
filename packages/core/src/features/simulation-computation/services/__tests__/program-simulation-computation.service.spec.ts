import { afterEach, describe, expect, it, vi } from 'vitest'
import { prisma } from '../../../../prisma/client.ts'
import { SimulationNotFinishedException } from '../../exceptions/simulation-computation.exception.ts'
import { simulationFactory } from '../../factories/simulation.factory.ts'
import { findSimulationComputation } from '../../repositories/simulation-computations.repository.ts'
import { createProgramSimulationComputation } from '../program-simulation-computation.ts'

vi.mock('@incubateur-ademe/nosgestesclimat/package.json', () => ({
  default: { version: '1.0.0' },
}))

const logger = { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() }
const programSimulationComputation = createProgramSimulationComputation({
  logger,
})

describe('programSimulationComputation', () => {
  afterEach(async () => {
    await prisma.simulationComputation.deleteMany()
    await prisma.simulation.deleteMany()
    vi.clearAllMocks()
  })

  it('throws SimulationNotFinished when progression is not 1', async () => {
    const { id } = await simulationFactory.params({ progression: 0.5 }).create()

    await expect(programSimulationComputation(id)).rejects.toThrow(
      SimulationNotFinishedException
    )
  })

  it.each([
    [
      'FR region, current version',
      () => simulationFactory.completed().withModelRegion('FR'),
    ],
    [
      'a non-FR region, current version',
      () => simulationFactory.completed().withModelRegion('UK'),
    ],
    [
      'en locale, current version',
      () => simulationFactory.completed().withModelLocale('en'),
    ],
    [
      // The engine registry retrieves any published version, so an outdated
      // tag is no longer a reason to drop the job.
      'an outdated published version',
      () =>
        simulationFactory
          .completed()
          .withModelVersion({ publishedTag: '0.9.0' }),
    ],
    [
      'a PR version',
      () => simulationFactory.completed().withModelVersion({ PRNumber: '42' }),
    ],
  ])(
    'creates a pending computation when simulation is finished: %s',
    async (_, setup) => {
      const { id } = await setup().create()

      await programSimulationComputation(id)

      const computation = await findSimulationComputation(id)
      expect(computation).not.toBeNull()
      expect(computation!.status).toBe('pending')
    }
  )
})
