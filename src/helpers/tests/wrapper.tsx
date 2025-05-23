import { IframeOptionsProvider } from '@/app/[locale]/_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '@/app/[locale]/_components/mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import PRNumberHook from '@/components/providers/simulationProviders/PRNumberHook'
import SimulationSyncProvider from '@/components/providers/simulationProviders/SimulationSyncProvider'
import { STORAGE_KEY } from '@/constants/storage'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'
import {
  EngineProvider,
  useCurrentSimulation,
  UserProvider,
  useUser,
} from '@/publicodes-state'
import type { Simulation } from '@/publicodes-state/types'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { useState } from 'react'

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

  if (providers.prNumber) {
    wrapped = <PRNumberHook setPRNumber={setPRNumber} />
  }

  if (providers.engine) {
    wrapped = <EngineProvider rules={{} as NGCRules}>{wrapped}</EngineProvider>
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

  return wrapped
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
