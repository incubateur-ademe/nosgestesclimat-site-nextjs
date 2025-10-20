import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const MUST_NOT_ASK_QUESTIONS: Set<DottedName> = new Set([
  'divers . textile . empreinte précise',
  'divers . textile . choix précis',
  'divers . ameublement . meubles',
  'divers . électroménager . appareils',
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . infolettre',
  'métrique',
  'logement . électricité verte',
  'logement . chauffage . électricité',
  'futureco-data . transport . ferry . distance aller . orthodromique',
  'futureco-data . transport . ferry . durée du voyage',
  'futureco-data . transport . ferry . vitesse en kmh',
  'futureco-data . transport . ferry . cabine',
  'futureco-data . transport . ferry . groupe',
  'futureco-data . transport . ferry . consommation de services',
  'futureco-data . transport . ferry . voiture',
  'services sociétaux . devenir producteur photovoltaique',
  'services sociétaux . bien placer argent',
])

// We use the DottedName type from nosgestesclimat to make sure the build will break when using rules that are not in the model.
export const PRIORITY_QUESTIONS: Set<DottedName> = new Set([
  'alimentation . plats',
  'logement . type',
  'logement . chauffage . bois . type',
  'logement . électricité . réseau . consommation',
  'transport . voiture . km',
  'transport . voiture . voyageurs',
  'divers . numérique . internet . durée journalière',
])

export const NON_PRIORITY_QUESTIONS: Set<DottedName> = new Set([
  'logement . électricité . réseau . consommation',
  'transport . voiture . thermique . consommation aux 100',
])

export const MUST_ASK_QUESTIONS: Set<DottedName> = new Set([
  // With Publicodes >1.8.0, 'services sociétaux . question rhétorique' is not in the missing variable as it's a question "une possibilité" with only on possible answer... So logically,the question is already answered.
  'services sociétaux . question rhétorique',
])
