import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import QueryClientProviderWrapper from '../../_components/mainLayoutProviders/QueryClientProviderWrapper'
import LatestResults from './LatestResults'
import ProfileTab from './ProfileTabs'

type Props = {
  locale: Locale
  simulation: Simulation
}

export default function ResultsView({ locale, simulation }: Props) {
  return (
    <>
      <ProfileTab locale={locale} activePath={MON_ESPACE_PATH} />
      <QueryClientProviderWrapper>
        <LatestResults locale={locale} simulation={simulation} />
      </QueryClientProviderWrapper>
    </>
  )
}
