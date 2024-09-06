import { Simulation } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

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
