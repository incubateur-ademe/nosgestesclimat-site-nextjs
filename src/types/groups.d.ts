import type { Simulation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export type Participant = {
  id: string
  name: string
  simulation: Simulation
  userId?: string
  email?: string
}

export type Group = {
  id: string
  name: string
  emoji: string
  participants: Participant[]
  administrator: {
    name: string
    id: string
    email?: string
  }
}

export type ValueObject = {
  name: DottedName
  value: number
  mean?: number
  difference?: number
  isCategory?: boolean
}

export type CategoriesAndSubcategoriesFootprintsType = {
  [key in DottedName]: ValueObject
}

export type PointsFortsFaiblesType = {
  key: string
  resultObject: ValueObject
}

export type Results = {
  currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  pointsForts: PointsFortsFaiblesType[]
  pointsFaibles: PointsFortsFaiblesType[]
}
