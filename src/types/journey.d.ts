export type JourneyPeriod = 'day' | 'week' | 'month' | 'year'

export type Journey = {
  id: string
  label: string
  distance: number
  reccurrence: number
  period: JourneyPeriod
  passengers: number
}
