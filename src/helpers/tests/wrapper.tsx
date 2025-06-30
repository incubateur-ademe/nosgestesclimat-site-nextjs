import { IframeOptionsProvider } from '@/app/[locale]/_components/mainLayoutProviders/IframeOptionsContext'
import MainHooks from '@/app/[locale]/_components/mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import { CookieConsentProvider } from '@/components/cookies/CookieConsentProvider'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import EngineProviders from '@/components/providers/EngineProviders'
import PRNumberHook from '@/components/providers/simulationProviders/PRNumberHook'
import SimulationSyncProvider from '@/components/providers/simulationProviders/SimulationSyncProvider'
import { STORAGE_KEY } from '@/constants/storage'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'
import { getSupportedRegions } from '@/helpers/modelFetching/getSupportedRegions'
import UserProvider from '@/publicodes-state/providers/userProvider/provider'
import type { Simulation } from '@/publicodes-state/types'
import { faker } from '@faker-js/faker'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr-opti.json'
import migrationInstructions from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import '@testing-library/jest-dom'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'

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

// Default mock values
const defaultSimulation: Simulation = {
  id: faker.string.uuid(),
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
  userId: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
}

const defaultState = {
  user: defaultUser,
  tutorials: {},
  simulations: [defaultSimulation],
  currentSimulationId: defaultSimulation.id,
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
  cookieConsent?: boolean
}

const TestWrapper = ({
  children,
  providers,
}: {
  children: ReactElement
  providers: ProviderConfig
}) => {
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

  if (providers.cookieConsent) {
    wrapped = <CookieConsentProvider>{wrapped}</CookieConsentProvider>
  }

  if (providers.errorBoundary) {
    wrapped = <ErrorBoundary>{wrapped}</ErrorBoundary>
  }

  return (
    <>
      {providers.prNumber && <PRNumberHook setPRNumber={() => {}} />}
      {wrapped}
    </>
  )
}

export const renderWithWrapper = (
  ui: ReactElement,
  {
    user = defaultUser,
    currentSimulation = defaultSimulation,
    simulations = [defaultSimulation],
    providers = {
      queryClient: true,
      errorBoundary: true,
      cookieConsent: true,
    },
    ...options
  }: RenderOptions & {
    user?: Partial<typeof defaultUser>
    currentSimulation?: Partial<typeof defaultSimulation>
    simulations?: Simulation[]
    providers?: ProviderConfig
  } = {}
) => {
  const userMerged = {
    ...defaultUser,
    ...user,
  }

  localStorage.setItem(
    'nosgestesclimat::v3',
    JSON.stringify({
      ...defaultState,
      user: userMerged,
      simulations,
      currentSimulationId: currentSimulation?.id ?? defaultSimulation?.id,
      tutorials: {},
    })
  )

  return render(<TestWrapper providers={providers}>{ui}</TestWrapper>, options)
}
