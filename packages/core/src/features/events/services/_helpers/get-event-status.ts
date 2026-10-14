import type { EventStatus } from '../../types/status.ts'

export function getEventStatus({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}): EventStatus {
  const currentDate = new Date()

  if (currentDate < startDate) {
    return 'not_started'
  }

  if (currentDate > endDate) {
    return 'ended'
  }

  return 'in_progress'
}
