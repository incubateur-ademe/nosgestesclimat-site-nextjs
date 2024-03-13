import { Simulation } from './simulation'

export type Member = {
  _id: string
  name: string
  email?: string
  simulation: Simulation
  userId: string
  results: SimulationResults
}

export type Group = {
  _id: string
  name: string
  emoji: string
  members: Member[]
  owner: {
    _id: string
    name: string
    email?: string
    userId: string
  }
}

export type SimulationResults = {
  total: string
  transport: {
    value: string
    variation: string
  }
  transports: {
    value: string
    variation: string
  }
  alimentation: {
    value: string
    variation: string
  }
  logement: {
    value: string
    variation: string
  }
  divers: {
    value: string
    variation: string
  }
  'services sociétaux': {
    value: string
    variation: string
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
