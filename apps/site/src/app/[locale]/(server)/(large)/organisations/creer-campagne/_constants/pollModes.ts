export const POLL_MODES = [
  {
    value: 'standard',
    titleKey: 'collectiveTest.mode.standard.title',
    titleDefault: 'Mode standard',
    descriptionKey: 'collectiveTest.mode.standard.description',
    descriptionDefault:
      'Le test classique, pour tous les citoyennes et citoyens',
    imageSrc:
      'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/empreinte_carbone_achats_be9fd99289.svg',
    imageAlt: 'Illustration mode standard',
  },
  {
    value: 'scolaire',
    titleKey: 'collectiveTest.mode.scolaire.title',
    titleDefault: 'Mode scolaire',
    descriptionKey: 'collectiveTest.mode.scolaire.description',
    descriptionDefault: 'Le test adapté aux jeunes (collège, lycée)',
    imageSrc:
      'https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_children_holding_hand_6951392e78.png',
    imageAlt: 'Illustration mode scolaire',
  },
] as const
