import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

/**
 * Return a stable, unique HTML id for the warning of a given question.
 *
 * The id is derived from the (slugified) dotted name so each warning has its
 * own id and can be referenced by the corresponding field via `aria-describedby`
 * for accessibility.
 */
export function getWarningId(question: DottedName): string {
  const WARNING_ID_PREFIX = 'warning-message'

  return `${WARNING_ID_PREFIX}_${question.replaceAll(' . ', '-')}`
}
