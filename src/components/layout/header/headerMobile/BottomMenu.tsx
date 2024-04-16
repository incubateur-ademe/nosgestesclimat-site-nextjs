'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/Trans'
import {
  headerClickActions,
  headerClickClassements,
  headerClickTest,
} from '@/constants/tracking/layout'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { trackEvent } from '@/utils/matomo/trackEvent'
import NavLink from '../NavLink'

export default function BottomMenu() {
  const { getLinkToSimulateurPage } = useSimulateurPage()

  return (
    <ul className="fixed bottom-0 left-0 z-[201] flex w-screen justify-around border-t border-gray-200 border-t-gray-200 bg-white shadow-md">
      <li className="h-full w-full">
        <NavLink
          href={getLinkToSimulateurPage()}
          onClick={() => trackEvent(headerClickTest)}
          activeMatches={['/tutoriel', '/simulateur']}
          icon={BilanIcon}
          className="flex-col  p-2 px-4"
          activeClassName="bg-primary-50 border-r border-gray-200 text-primary-700 font-bold">
          <Trans>Empreinte</Trans>
        </NavLink>
      </li>

      <li className="h-full w-full">
        <NavLink
          className="flex-col  p-2 px-4"
          activeClassName="bg-white border-x border-gray-200 text-primary-700 font-bold"
          href="/actions"
          onClick={() => trackEvent(headerClickActions)}
          icon={ActionsIcon}>
          <Trans>Gestes</Trans>
        </NavLink>
      </li>

      <li className="h-full w-full">
        <NavLink
          className="flex-col p-2 px-4"
          activeClassName="bg-white border-l border-gray-200 text-primary-700 font-bold"
          href={linkToClassement}
          onClick={() => trackEvent(headerClickClassements)}
          icon={AmisIcon}
          data-cypress-id="amis-link">
          <Trans>Classements</Trans>
        </NavLink>
      </li>
    </ul>
  )
}
