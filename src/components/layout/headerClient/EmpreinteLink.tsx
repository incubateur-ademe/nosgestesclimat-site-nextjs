import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/trans/TransClient'
import { headerClickTest } from '@/constants/tracking/layout'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import NavLink from '../header/NavLink'

export default function EmpreinteLink() {
  const { getLinkToSimulateurPage } = useSimulateurPage()

  const { t } = useClientTranslation()

  return (
    <NavLink
      id="nav-first-link"
      href={getLinkToSimulateurPage()}
      onClick={() => trackEvent(headerClickTest)}
      activeMatches={['/tutoriel', '/simulateur', '/fin']}
      icon={BilanIcon}
      title={t('Mon empreinte')}>
      <Trans>Mon empreinte</Trans>
    </NavLink>
  )
}
