type DottedName = string

export type Situation = Record<DottedName, any>

type QuestionsKind =
  | "à l'affiche"
  | 'non prioritaires'
  | 'liste'
  | 'liste noire'

export type ObjectifsConfig =
  | Array<DottedName>
  | Array<{ icône: string; nom: string; objectifs: Array<DottedName> }>

export type SimulationConfig = {
  objectifs: ObjectifsConfig
  'objectifs cachés': Array<DottedName>
  situation: Simulation['situation']
  bloquant?: Array<DottedName>
  questions?: Partial<Record<QuestionsKind, Array<DottedName>>>
  branches?: Array<{ nom: string; situation: SimulationConfig['situation'] }>
  'unité par défaut': string
}

export type StoredTrajets = Record<DottedName, any>
