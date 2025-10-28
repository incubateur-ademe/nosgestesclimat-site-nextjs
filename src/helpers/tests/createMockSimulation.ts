import type { Simulation } from '@/publicodes-state/types'
import { faker } from '@faker-js/faker'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { getInitialExtendedSituation } from '../modelFetching/getInitialExtendedSituation'

/**
 * Create a mock simulation object for testing
 * @param overrides - Partial simulation object to override defaults
 * @returns A complete mock simulation object
 */
export const createMockSimulation = (
  overrides: Partial<Simulation> = {}
): Simulation => ({
  id: faker.string.uuid(),
  date: new Date(),
  situation: {},
  extendedSituation: getInitialExtendedSituation(),
  foldedSteps: [],
  actionChoices: {},
  computedResults: {
    carbone: {
      bilan: 0,
      categories: {
        transport: 0,
        alimentation: 0,
        logement: 0,
        divers: 0,
        'services sociétaux': 0,
      } as Record<DottedName, number>,
      subcategories: {} as Record<DottedName, number>,
    },
    eau: {
      bilan: 0,
      categories: {
        transport: 0,
        alimentation: 0,
        logement: 0,
        divers: 0,
        'services sociétaux': 0,
      } as Record<DottedName, number>,
      subcategories: {} as Record<DottedName, number>,
    },
  },
  progression: 0,
  customAdditionalQuestionsAnswers: {},
  ...overrides,
})
