import { IframeOptionsProvider } from '@/app/[locale]/_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '@/app/[locale]/_components/mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import EngineProviders from '@/components/providers/EngineProviders'
import PRNumberHook from '@/components/providers/simulationProviders/PRNumberHook'
import SimulationSyncProvider from '@/components/providers/simulationProviders/SimulationSyncProvider'
import { STORAGE_KEY } from '@/constants/storage'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import UserProvider from '@/publicodes-state/providers/userProvider/provider'
import type { Simulation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { useState } from 'react'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock the hooks
jest.mock('@/publicodes-state', () => ({
  useUser: jest.fn(),
  useCurrentSimulation: jest.fn(),
}))

// Mock useRules
jest.mock('@/hooks/useRules', () => ({
  useRules: () => ({
    data: rules,
    isLoading: false,
    isFetched: true,
  }),
}))

// Mock getGeolocation
jest.mock('@/helpers/api/getGeolocation', () => ({
  getGeolocation: () => Promise.resolve(undefined),
}))

// Mock usePersistentUser
jest.mock(
  '@/publicodes-state/providers/userProvider/hooks/usePersistentUser',
  () => ({
    __esModule: true,
    default: () => ({
      user: {
        userId: '1',
        name: 'Test User',
        email: 'test@example.com',
      },
      setUser: jest.fn(),
    }),
  })
)

// Mock usePersistentTutorials
jest.mock(
  '@/publicodes-state/providers/userProvider/hooks/usePersistentTutorials',
  () => ({
    __esModule: true,
    default: () => ({
      tutorials: {},
      setTutorials: jest.fn(),
    }),
  })
)

// Mock usePersistentSimulations
jest.mock(
  '@/publicodes-state/providers/userProvider/hooks/usePersistentSimulations',
  () => ({
    __esModule: true,
    default: () => ({
      simulations: [],
      setSimulations: jest.fn(),
      currentSimulationId: null,
      setCurrentSimulationId: jest.fn(),
    }),
  })
)

// Mock useUpdateOldLocalStorage
jest.mock(
  '@/publicodes-state/providers/userProvider/hooks/useOldLocalStorage',
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
)

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
        transport: 0,
        alimentation: 0,
        logement: 0,
        divers: 0,
        'services sociétaux': 0,
      } as Record<DottedName, number>,
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

type ProviderConfig = {
  errorBoundary?: boolean
  queryClient?: boolean
  user?: boolean
  partner?: boolean
  iframeOptions?: boolean
  preventNavigation?: boolean
  mainHooks?: boolean
  engine?: boolean
  prNumber?: boolean
  simulationSync?: boolean
}

const TestWrapper = ({
  children,
  providers,
}: {
  children: ReactElement
  providers: ProviderConfig
}) => {
  const [PRNumber, setPRNumber] = useState<string | undefined>(undefined)

  let wrapped = children

  if (providers.simulationSync) {
    wrapped = <SimulationSyncProvider>{wrapped}</SimulationSyncProvider>
  }

  if (providers.engine) {
    wrapped = (
      <EngineProviders supportedRegions={getSupportedRegions()} isOptim={false}>
        {wrapped}
      </EngineProviders>
    )
  }

  if (providers.mainHooks) {
    wrapped = <MainHooks>{wrapped}</MainHooks>
  }

  if (providers.preventNavigation) {
    wrapped = <PreventNavigationProvider>{wrapped}</PreventNavigationProvider>
  }

  if (providers.iframeOptions) {
    wrapped = (
      <IframeOptionsProvider>
        {(containerRef) => <div ref={containerRef as any}>{wrapped}</div>}
      </IframeOptionsProvider>
    )
  }

  if (providers.partner) {
    wrapped = <PartnerProvider>{wrapped}</PartnerProvider>
  }

  if (providers.user) {
    wrapped = (
      <UserProvider
        storageKey={STORAGE_KEY}
        migrationInstructions={migrationInstructions}>
        {wrapped}
      </UserProvider>
    )
  }

  if (providers.queryClient) {
    wrapped = <QueryClientProviderWrapper>{wrapped}</QueryClientProviderWrapper>
  }

  if (providers.errorBoundary) {
    wrapped = <ErrorBoundary>{wrapped}</ErrorBoundary>
  }

  return (
    <>
      {providers.prNumber && <PRNumberHook setPRNumber={setPRNumber} />}
      {wrapped}
    </>
  )
}

export const renderWithWrapper = (
  ui: ReactElement,
  {
    user = defaultUser,
    currentSimulation = defaultSimulation,
    providers = {
      queryClient: true,
      errorBoundary: true,
    },
    ...options
  }: RenderOptions & {
    user?: Partial<typeof defaultUser>
    currentSimulation?: Partial<typeof defaultSimulation>
    providers?: ProviderConfig
  } = {}
) => {
  ;(useUser as jest.Mock).mockReturnValue({ ...defaultUser, ...user })
  ;(useCurrentSimulation as jest.Mock).mockReturnValue({
    ...defaultSimulation,
    ...currentSimulation,
  })

  return render(<TestWrapper providers={providers}>{ui}</TestWrapper>, options)
}
