// Minimal local types so the e2e suite does not import app internals.
export type Situation = Record<string, string | number>

export type SimulationMode = 'scolaire' | 'standard'
