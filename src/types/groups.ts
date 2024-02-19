import { Simulation } from '@/publicodes-state/types'

export type Participant = {
  _id: string
  name: string
  email?: string
  simulation: Simulation
  userId: string
}

export type Group = {
  _id: string
  name: string
  emoji: string
  participants: Participant[]
  administrator: {
    _id: string
    name: string
    email?: string
    userId: string
  }
}

export type ValueObject = {
  name: string
  value: number
  mean?: number
  difference?: number
  isCategory?: boolean
}

export type Points = {
  key: string
  resultObject: ValueObject
}

export type Results = {
  userFootprintByCategoriesAndSubcategories: Record<string, ValueObject>
  groupFootprintByCategoriesAndSubcategories: Record<string, ValueObject>
  pointsForts: Points[]
  pointsFaibles: Points[]
}
