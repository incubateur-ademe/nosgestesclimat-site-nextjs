type Persona = {
  nom: string
  icônes: string
  situation: Situation
  description?: string
  résumé: string
}

export type Situation = Record<string, any>

type QuestionsKind =
  | "à l'affiche"
  | 'non prioritaires'
  | 'liste'
  | 'liste noire'

export type ObjectifsConfig =
  | Array<string>
  | Array<{ icône: string; nom: string; objectifs: Array<string> }>

export type SimulationConfig = {
  objectifs: ObjectifsConfig
  'objectifs cachés': Array<string>
  situation: Simulation['situation']
  bloquant?: Array<string>
  questions?: Partial<Record<QuestionsKind, Array<string>>>
  branches?: Array<{ nom: string; situation: SimulationConfig['situation'] }>
  'unité par défaut': string
}

export type StoredTrajets = Record<string, any>

export type Simulation = {
  config: SimulationConfig
  url: string
  hiddenNotifications: Array<string>
  situation: Situation
  hiddenControls?: Array<string>
  targetUnit?: string
  foldedSteps?: Array<string>
  unfoldedStep?: string | null
  persona?: Persona
  date?: Date
  id?: string
  eventsSent?: Record<string, boolean>
  actionChoices?: Record<string, boolean>
  storedTrajets?: StoredTrajets
}
