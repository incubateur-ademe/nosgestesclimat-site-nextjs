import type { ActionPlan, PersonalizedAction } from '../types/action.ts'

/**
 * The plan summary of a list of committed actions: how many actions the user
 * committed to and their summed impact (actions without assessment count as
 * 0 impact).
 *
 * Returns null when the list is empty: the user has no plan yet.
 */
export const buildActionPlan = (
  committedActions: PersonalizedAction[]
): ActionPlan | null =>
  committedActions.length > 0
    ? {
        numberOfCommittedActions: committedActions.length,
        totalImpact: committedActions.reduce(
          (total, action) => total + (action.assessment?.impact ?? 0),
          0
        ),
      }
    : null
