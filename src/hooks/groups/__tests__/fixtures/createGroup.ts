import { Participant } from '@/types/groups'
import { faker } from '@faker-js/faker'

function createSimulation({
  footprintSize,
}: {
  footprintSize: 'small' | 'medium' | 'large'
}) {
  const baseFootprint = {
    small: 5000,
    medium: 10000,
    large: 15000,
  }[footprintSize]

  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    foldedSteps: [],
    actionChoices: {},
    situation: {},
    computedResults: {
      carbone: {
        categories: {
          transport:
            53.766067864271164 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          alimentation:
            1059.9493324512537 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          logement:
            515.7754709293043 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          divers:
            393.8155361279359 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          servicesSociétaux:
            1450.9052263863641 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
        },
        subcategories: {
          'transport . voiture': 0,
          'transport . avion': 0,
          'transport . deux roues': 0,
          'transport . mobilité douce':
            9.666666666666666 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'transport . train':
            44.0994011976045 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'transport . transports commun': 0,
          'transport . vacances': 0,
          'transport . ferry': 0,
          'alimentation . repas':
            635.1385415929203 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'alimentation . boisson':
            376.7687333333334 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'alimentation . déchets':
            48.042057525 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'logement . construction':
            439.90880426263766 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'logement . électricité':
            69.33333333333333 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'logement . chauffage': 0,
          'logement . climatisation': 0,
          'logement . piscine': 0,
          'logement . extérieur': 0,
          'logement . vacances':
            6.533333333333332 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'divers . animaux domestiques': 0,
          'divers . loisirs':
            104.65502238223864 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'divers . numérique':
            55.84292 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'divers . textile':
            32 * (baseFootprint / 10000) * (1 + Math.random() * 0.1 - 0.05),
          'divers . électroménager':
            5.1925 * (baseFootprint / 10000) * (1 + Math.random() * 0.1 - 0.05),
          'divers . ameublement':
            116.16779166666667 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'divers . produits consommables': 0,
          'divers . tabac': 0,
          'divers . autres produits':
            79.95730207903055 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'services sociétaux . services publics':
            1259.4428717769142 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'services sociétaux . services marchands':
            191.4623546094499 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
        },
        bilan:
          3474.211633759129 *
          (baseFootprint / 10000) *
          (1 + Math.random() * 0.1 - 0.05),
      },
      eau: {
        categories: {
          transport: 0,
          alimentation:
            1821844.3333333333 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          logement:
            12626.666666666666 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          divers:
            82708.3087 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'services sociétaux': 0,
        },
        subcategories: {
          'transport . voiture': 0,
          'transport . avion': 0,
          'transport . deux roues': 0,
          'transport . mobilité douce': 0,
          'transport . train': 0,
          'transport . transports commun': 0,
          'transport . vacances': 0,
          'transport . ferry': 0,
          'alimentation . repas':
            1552019 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'alimentation . boisson':
            269825.3333333333 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'alimentation . déchets': 0,
          'logement . construction': 0,
          'logement . électricité':
            12626.666666666666 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'logement . chauffage': 0,
          'logement . climatisation': 0,
          'logement . piscine': 0,
          'logement . extérieur': 0,
          'logement . vacances': 0,
          'divers . animaux domestiques': 0,
          'divers . loisirs': 0,
          'divers . numérique':
            69788.3087 *
            (baseFootprint / 10000) *
            (1 + Math.random() * 0.1 - 0.05),
          'divers . textile':
            12920 * (baseFootprint / 10000) * (1 + Math.random() * 0.1 - 0.05),
          'divers . électroménager': 0,
          'divers . ameublement': 0,
          'divers . produits consommables': 0,
          'divers . tabac': 0,
          'divers . autres produits': 0,
          'services sociétaux . services publics': 0,
          'services sociétaux . services marchands': 0,
        },
        bilan:
          1917179.3087 *
          (baseFootprint / 10000) *
          (1 + Math.random() * 0.1 - 0.05),
      },
    },
    progression: 1,
  }
}

export function createGroup({
  participants,
  currentUserId,
}: {
  participants: (Participant & {
    footprintSize: 'small' | 'medium' | 'large'
  })[]
  currentUserId: string
}) {
  return {
    participants: participants.map((p, index) => ({
      // We set the first participant as the current user
      userId: !index ? currentUserId : faker.string.uuid(),
      simulation: createSimulation({ footprintSize: p.footprintSize }),
      name: p.name || faker.name.firstName(),
      _id: faker.database.mongodbObjectId(),
    })),
  }
}
