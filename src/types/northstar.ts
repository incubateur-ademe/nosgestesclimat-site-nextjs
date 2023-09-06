export type NorthStarType = 'action' | 'learned'

export type NorthStarValue = 0 | 1 | 2 | 3 | 'no_display' | 'display' | 'refuse'

export type NorthStarRatings = Record<NorthStarType, NorthStarValue>
