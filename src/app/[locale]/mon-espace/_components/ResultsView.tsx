import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
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

      <LatestResults locale={locale} simulation={simulation} />
    </>
  )
}
