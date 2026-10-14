import type { ISOSupportedLanguage } from '../../geo/types/language.ts'
import { findLastFinishedSimulationByUserId } from '../../simulation-computation/repositories/simulation-computations.repository.ts'
import { buildActionPlan } from '../helpers/action-plan.ts'
import { findAllVisibleCommittedPersonalizedActions } from '../repositories/actions.repository.ts'
import { findThemes } from '../repositories/themes.repository.ts'
import type { ActionPlan, PersonalizedAction } from '../types/action.ts'
import type { Theme } from '../types/theme.ts'

/** A theme holding the actions the user committed to */
export interface ActionsPlanTheme extends Theme {
  actions: PersonalizedAction[]
}

export interface ActionsPlan {
  plan: ActionPlan
  /** Themes holding at least one committed action, in theme order */
  themes: ActionsPlanTheme[]
}

/**
 * The user's action plan: the actions they committed to, grouped by theme,
 * with the plan summary (committed actions count and total impact).
 *
 * Committed actions are kept as they are: without assessment or assessed as
 * inapplicable, they still belong to the plan.
 *
 * The user id is mandatory: callers must authenticate the user first.
 * Returns null when the user has no finished simulation or no committed
 * action: they have no plan yet.
 */
export const getActionsPlan = async (
  userId: string,
  locale: ISOSupportedLanguage
): Promise<ActionsPlan | null> => {
  // Assessments are read from the latest finished simulation: a computation
  // from an older simulation would report impacts assessed for another one.
  // Without a finished simulation the user has no plan.
  const lastFinished = await findLastFinishedSimulationByUserId(userId)
  if (!lastFinished) return null

  const [committedActions, themes] = await Promise.all([
    findAllVisibleCommittedPersonalizedActions({
      simulationId: lastFinished.simulationId,
      userId,
      locale,
      fallbackToDefaultLocale: true,
    }),
    findThemes(locale),
  ])

  const plan = buildActionPlan(committedActions)
  if (!plan) return null

  // Within a theme, actions are ordered by descending impact, actions with
  // unknown impact last
  const committedActionsByTheme = Object.groupBy(
    [...committedActions].sort(
      (a, b) =>
        (b.assessment?.impact ?? -Infinity) -
        (a.assessment?.impact ?? -Infinity)
    ),
    (action) => action.theme.key
  )

  return {
    plan,
    themes: themes
      .filter((theme) => committedActionsByTheme[theme.key]?.length)
      .map((theme) => ({
        ...theme,
        actions: committedActionsByTheme[theme.key] ?? [],
      })),
  }
}
