import type { Participant } from '@/types/groups'
import type { TFunction } from 'i18next'

interface Props {
  t: TFunction
  participant: Participant
}

/**
 * Falls back on empty names too, not only on `null`: rows saved while the API
 * still let an anonymous end-of-test overwrite the joined name carry `''`.
 */
export const getParticipantName = ({ t, participant }: Props) =>
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  participant.name ||
  t('groups.results.rankingMember.anonymous', 'Utilisateur anonyme')
