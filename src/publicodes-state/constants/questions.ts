import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const MUST_NOT_ASK_QUESTIONS: Set<DottedName> = new Set([
  // Mosaic "Textile" is hidden but can be answered is "choix précis" is set to "oui".
  'divers . textile . empreinte précise',
  'divers . textile . choix précis',
  // Mosaic "Ameublement" and "Électroménager" questions must not be asked, as their children.
  'divers . ameublement . meubles',
  'divers . électroménager . appareils',
  'divers . ameublement . meubles . armoire . nombre',
  'divers . ameublement . meubles . canapé . nombre',
  'divers . ameublement . meubles . matelas . nombre',
  'divers . ameublement . meubles . lit . nombre',
  'divers . ameublement . meubles . table . nombre',
  'divers . ameublement . meubles . chaise . nombre',
  'divers . ameublement . meubles . petit meuble . nombre',
  'divers . ameublement . meubles . grand meuble . nombre',
  'divers . électroménager . appareils . réfrigérateur . nombre',
  'divers . électroménager . appareils . petit réfrigérateur . nombre',
  'divers . électroménager . appareils . congélateur . nombre',
  'divers . électroménager . appareils . lave-linge . nombre',
  'divers . électroménager . appareils . sèche-linge . nombre',
  'divers . électroménager . appareils . lave-vaisselle . nombre',
  'divers . électroménager . appareils . four . nombre',
  'divers . électroménager . appareils . micro-onde . nombre',
  'divers . électroménager . appareils . plaques . nombre',
  'divers . électroménager . appareils . hotte . nombre',
  'divers . électroménager . appareils . bouilloire . nombre',
  'divers . électroménager . appareils . cafetière . nombre',
  'divers . électroménager . appareils . aspirateur . nombre',
  'divers . électroménager . appareils . robot cuisine . nombre',
])

// We use the DottedName type from nosgestesclimat to make sure the build will break when using rules that are not in the model.
export const PRIORITY_QUESTIONS: Set<DottedName> = new Set([
  'alimentation . plats',
  'logement . chauffage . bois . type',
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
