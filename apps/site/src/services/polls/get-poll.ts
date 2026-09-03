import { getPoll as getPollService } from '@nosgestesclimat/core/features/polls/services/get-poll.service'
import type { Poll } from '@nosgestesclimat/core/features/polls/types/poll'
import { cacheLife } from 'next/cache'

/**
 * Cached 5 minutes and shared by every visitor: the payload carries no data
 * about the current user.
 *
 * Returns `null` when no poll matches, leaving it to the caller to decide how
 * absence is surfaced (a 404 page, a tolerated `null`, ...).
 */
export async function getPoll(pollIdOrSlug: string): Promise<Poll | null> {
  'use cache'
  // `minutes` revalidates after 60s, which is shorter than we need here.
  cacheLife({ stale: 300, revalidate: 300, expire: 900 })

  return await getPollService({ pollIdOrSlug })
}
