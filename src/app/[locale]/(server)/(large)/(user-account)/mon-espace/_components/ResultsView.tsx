import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import type { Locale } from '@/i18nConfig'
import UserProvider from '@/publicodes-state/providers/userProvider/provider'
import type { Simulation } from '@/publicodes-state/types'
import LatestResults from './LatestResults'
import ProfileTab from './ProfileTabs'
import EvolutionGraph from './resultsView/EvolutionGraph'
import ResultsList from './resultsView/ResultsList'
import ShareSimulator from './resultsView/ShareSimulator'

interface Props {
  locale: Locale
  simulations: Simulation[]
}

export default function ResultsView({ locale, simulations }: Props) {
  const hasSingleSimulation = simulations.length === 1

  return (
    <UserProvider serverSimulations={simulations}>
      <ProfileTab locale={locale} activePath={MON_ESPACE_PATH} />

      <LatestResults locale={locale} simulation={simulations[0]} />

      <ShareSimulator locale={locale} />

      <ResultsList locale={locale} simulations={simulations} />

      <EvolutionGraph
        locale={locale}
        simulations={simulations}
        hasSingleSimulation={hasSingleSimulation}
      />
    </UserProvider>
  )
}
