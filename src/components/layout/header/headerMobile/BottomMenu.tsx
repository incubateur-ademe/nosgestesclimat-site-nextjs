import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/Trans'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import NavLink from '../NavLink'

export default function BottomMenu() {
  const { getLinkToSimulateurPage } = useSimulateurPage()

  return (
    <ul className="fixed bottom-0 left-0 z-[201] flex w-screen justify-around border-t border-gray-200 border-t-gray-200 bg-grey-100 shadow-md">
      <li className="h-full w-full">
        <NavLink
          href={getLinkToSimulateurPage()}
          activeMatches={['/tutoriel', '/simulateur']}
          icon={BilanIcon}
          className="flex-col  p-2 px-4"
          activeClassName="bg-white border-r border-gray-200 text-primary-500 font-bold">
          <Trans>Test</Trans>
        </NavLink>
      </li>

      <li className="h-full w-full">
        <NavLink
          className="flex-col  p-2 px-4"
          activeClassName="bg-white border-x border-gray-200 text-primary-500 font-bold"
          href="/actions"
          icon={ActionsIcon}>
          <Trans>Actions</Trans>
        </NavLink>
      </li>

      <li className="h-full w-full">
        <NavLink
          className="flex-col p-2 px-4"
          activeClassName="bg-white border-l border-gray-200 text-primary-500 font-bold"
          href={linkToClassement}
          icon={AmisIcon}
          data-cypress-id="amis-link">
          <Trans>Classements</Trans>
        </NavLink>
      </li>
    </ul>
  )
}
