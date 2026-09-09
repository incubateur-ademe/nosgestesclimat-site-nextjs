import { afterEach, describe, expect, it } from 'vitest'
import { prisma } from '../../../../prisma/client.ts'
import { validComputedResults } from '../../../simulations/factories/simulation.factory.ts'
import { organisationFactory } from '../../factories/organisation.factory.ts'
import { pollFactory } from '../../factories/poll.factory.ts'
import { getPoll } from '../get-poll.service.ts'

const createPoll = async (
  params: Parameters<typeof pollFactory.params>[0] = {}
) => {
  const organisation = await organisationFactory.create()
  const poll = await pollFactory
    .withOrganisation(organisation.id)
    .params(params)
    .create()

  return { organisation, poll }
}

describe('getPoll', () => {
  afterEach(async () => {
    await prisma.pollDefaultAdditionalQuestion.deleteMany()
    await prisma.poll.deleteMany()
    await prisma.organisation.deleteMany()
  })

  it('returns null when no poll matches', async () => {
    const result = await getPoll({ pollIdOrSlug: 'does-not-exist' })

    expect(result).toBeNull()
  })

  it('finds the poll by id', async () => {
    const { poll } = await createPoll()

    const result = await getPoll({ pollIdOrSlug: poll.id })

    expect(result).toEqual(expect.objectContaining({ id: poll.id }))
  })

  it('finds the poll by slug', async () => {
    const { poll } = await createPoll()

    const result = await getPoll({ pollIdOrSlug: poll.slug })

    expect(result).toEqual(expect.objectContaining({ id: poll.id }))
  })

  it('exposes the poll and its organisation', async () => {
    const { organisation, poll } = await createPoll({
      mode: 'scolaire',
      expectedNumberOfParticipants: 42,
      computedResults: validComputedResults,
      defaultAdditionalQuestions: ['postalCode', 'birthdate'],
      customAdditionalQuestions: [{ question: 'Votre service ?' }],
    })

    const result = await getPoll({ pollIdOrSlug: poll.slug })

    expect(result).toEqual({
      id: poll.id,
      name: poll.name,
      slug: poll.slug,
      mode: 'scolaire',
      expectedNumberOfParticipants: 42,
      funFacts: null,
      computedResults: validComputedResults,
      defaultAdditionalQuestions: ['postalCode', 'birthdate'],
      customAdditionalQuestions: [{ question: 'Votre service ?' }],
      createdAt: poll.createdAt,
      updatedAt: poll.updatedAt,
      organisation: {
        id: organisation.id,
        name: organisation.name,
        slug: organisation.slug,
      },
    })
  })
})
