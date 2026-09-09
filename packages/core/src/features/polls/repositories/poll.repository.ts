import type { JsonValue } from '@prisma/client/runtime/client'
import { prisma } from '../../../prisma/client.ts'
import type { PollMode } from '../../../prisma/generated/client.ts'
import type { Poll, PollSummary } from '../types/poll.ts'
import { toPoll } from './poll.mapper.ts'

export interface PollRow {
  id: string
  name: string
  slug: string
  mode: PollMode
  organisationId: string
  expectedNumberOfParticipants: number | null
  funFacts: JsonValue | null
  computedResults: JsonValue | null
  createdAt: Date
  updatedAt: Date
  organisation: {
    id: string
    name: string
    slug: string
  }
}

const pollSelect = {
  id: true,
  name: true,
  slug: true,
  mode: true,
  organisationId: true,
  expectedNumberOfParticipants: true,
  funFacts: true,
  computedResults: true,
  createdAt: true,
  updatedAt: true,
  organisation: {
    select: { id: true, name: true, slug: true },
  },
} as const

const pollSummarySelect = {
  id: true,
  name: true,
  slug: true,
  organisation: { select: { slug: true } },
} as const

export const findPollByIdOrSlug = async ({
  pollIdOrSlug,
}: {
  pollIdOrSlug: string
}): Promise<Poll | null> => {
  const row = await prisma.poll.findFirst({
    where: {
      OR: [{ id: pollIdOrSlug }, { slug: pollIdOrSlug }],
    },
    select: pollSelect,
  })

  return row ? toPoll(row) : null
}

export const findPollSummaryById = async ({
  id,
}: {
  id: string
}): Promise<PollSummary | null> => {
  return prisma.poll.findUnique({
    where: { id },
    select: pollSummarySelect,
  })
}
