import type { Group, OwnParticipant } from '@/types/groups'

/**
 * Finds the connected user's own entry in a group.
 *
 * The single source of truth for "does this visitor take part in this group?":
 * the invitation and the results pages guard on the very same answer, so that
 * they can never bounce the visitor back and forth.
 *
 * The API only exposes `userId` on the connected user's own participant, hence
 * a match narrows to {@link OwnParticipant} and its full simulation.
 */
export const findOwnParticipant = (
  group: Group,
  userId: string | undefined
): OwnParticipant | undefined =>
  userId
    ? group.participants.find(
        (participant): participant is OwnParticipant =>
          participant.userId === userId
      )
    : undefined
