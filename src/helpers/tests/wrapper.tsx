import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'

// Mock the hooks
jest.mock('@/publicodes-state', () => ({
  useUser: jest.fn(),
  useCurrentSimulation: jest.fn(),
}))

// Default mock values
const defaultSimulation: Simulation = {
  id: '1',
  date: new Date(),
  situation: {},
  foldedSteps: [],
  actionChoices: {},
  computedResults: {
    carbone: {
      bilan: 0,
      categories: {
        'commun . intensité électricité': 0,
        'commun . mois par an': 0,
        'commun . semaines par an': 0,
        'commun . jours par semaine': 0,
      } as Record<DottedName, number>,
    },
    eau: {
      bilan: 0,
      categories: {
        'commun . intensité électricité': 0,
        'commun . mois par an': 0,
        'commun . semaines par an': 0,
        'commun . jours par semaine': 0,
      } as Record<DottedName, number>,
    },
  },
  progression: 0,
  customAdditionalQuestionsAnswers: {},
}

const defaultUser = {
  user: {
    userId: '1',
    name: 'Test User',
    email: 'test@example.com',
  },
  tutorials: {},
  simulations: [defaultSimulation],
  currentSimulation: defaultSimulation,
  updateCurrentSimulation: jest.fn(),
}

export const renderWithWrapper = (
  ui: ReactElement,
  {
    user = defaultUser,
    ...options
  }: RenderOptions & {
    user?: Partial<typeof defaultUser>
  } = {}
) => {
  ;(useUser as jest.Mock).mockReturnValue({ ...defaultUser, ...user })
  ;(useCurrentSimulation as jest.Mock).mockReturnValue(user.currentSimulation)

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
    ),
    ...options,
  })
}
