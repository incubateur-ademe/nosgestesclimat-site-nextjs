import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const MUST_NOT_ASK_QUESTIONS: Set<DottedName> = new Set([
  'divers . textile . empreinte précise',
  'divers . textile . choix précis',
])

// We use the DottedName type from nosgestesclimat to make sure the build will break when using rules that are not in the model.
export const PRIORITY_QUESTIONS: Set<DottedName> = new Set([
  'alimentation . plats',
  'logement . chauffage . bois . type',
])

export const NON_PRIORITY_QUESTIONS: Set<DottedName> = new Set([
  'logement . électricité . réseau . consommation',
])

export const MUST_ASK_QUESTIONS: Set<DottedName> = new Set([
  // With Publicodes >1.8.0, 'services sociétaux . question rhétorique' is not in the missing variable as it's a question "une possibilité" with only on possible answer... So logically,the question is already answered.
  'services sociétaux . question rhétorique',
])
