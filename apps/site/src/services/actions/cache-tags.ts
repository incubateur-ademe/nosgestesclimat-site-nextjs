// The personalized actions caches rely on two tags:
// - one per user and action, shared by every cache entry involving that
//   action (action details, actions catalogue, action plan), so that
//   committing to or abandoning an action revalidates every cache entry
//   listing it,
// - one per user on the action plan, so that committing to a new action
//   revalidates the plan even though the cached plan doesn't list it yet.
export const getPersonalizedActionCacheTag = (
  userId: string,
  actionId: string
) => `user:${userId}::action:${actionId}`

export const getPersonalizedActionsPlanCacheTag = (userId: string) =>
  `user:${userId}::plan`
