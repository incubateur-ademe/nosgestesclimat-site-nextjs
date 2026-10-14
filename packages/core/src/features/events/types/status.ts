export type EventStatus = 'not_started' | 'in_progress' | 'ended'
export type EventStatusWithoutNotStarted = Exclude<EventStatus, 'not_started'>
