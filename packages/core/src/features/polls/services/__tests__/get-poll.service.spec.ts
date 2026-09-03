import { afterEach, describe, expect, it } from 'vitest'
import { prisma } from '../../../../prisma/client.ts'
import type { ComputedResults } from '../../../simulations/validators/computed-results.schema.ts'
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

  it('nulls out computedResults predating the current shape', async () => {
    const { poll } = await createPoll()
    await prisma.poll.update({
      where: { id: poll.id },
      data: { computedResults: { bilan: 1000 } },
    })

    const result = await getPoll({ pollIdOrSlug: poll.slug })

    expect(result?.computedResults).toBeNull()
  })
})

const validComputedResults = {
  carbone: {
    bilan: 1000,
    categories: {
      alimentation: 300,
      transport: 400,
      logement: 200,
      divers: 50,
      'services sociétaux': 50,
    },
    subcategories: {},
  },
  eau: {
    bilan: 500,
    categories: {
      alimentation: 150,
      transport: 200,
      logement: 100,
      divers: 25,
      'services sociétaux': 25,
    },
    subcategories: {},
  },
} satisfies ComputedResults
