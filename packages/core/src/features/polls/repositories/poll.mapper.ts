import type { FunFacts } from '@incubateur-ademe/nosgestesclimat'
import type { ComputedResults } from '../../simulations/validators/computed-results.schema.ts'
import type { Poll } from '../types/poll.ts'
import type { PollRow } from './poll.repository.ts'

export const toPoll = (row: PollRow): Poll => {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    mode: row.mode,
    expectedNumberOfParticipants: row.expectedNumberOfParticipants,
    funFacts: (row.funFacts as FunFacts | null) ?? null,
    computedResults: (row.computedResults as ComputedResults | null) ?? null,
    defaultAdditionalQuestions: row.defaultAdditionalQuestions.map(
      ({ type }) => type
    ),
    customAdditionalQuestions: row.customAdditionalQuestions,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    organisation: row.organisation,
  }
}
