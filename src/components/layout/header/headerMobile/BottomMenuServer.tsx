import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/trans/TransServer'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { linkToClassement } from '@/helpers/navigation/classementPages'
import type { Locale } from '@/i18nConfig'
import NavLinkServer from '../NavLinkServer'

export default function BottomMenuServer({ locale }: { locale: Locale }) {
  return (
    <ul className="fixed bottom-0 left-0 z-201 flex w-screen justify-around border-t border-gray-200 border-t-gray-200 bg-white shadow-md">
      <li className="h-full w-full">
        <NavLinkServer
          href={SIMULATOR_PATH}
          activeMatches={['/tutoriel', '/simulateur']}
          icon={BilanIcon}
          className="flex-col p-2 px-4"
          activeClassName="bg-primary-50 border-r border-gray-200 text-primary-700 font-bold">
          <Trans locale={locale}>Empreinte</Trans>
        </NavLinkServer>
      </li>

      <li className="h-full w-full">
        <NavLinkServer
          className="flex-col p-2 px-4"
          activeClassName="bg-white border-x border-gray-200 text-primary-700 font-bold"
          href="/actions"
          icon={ActionsIcon}>
          <Trans locale={locale}>Gestes</Trans>
        </NavLinkServer>
      </li>

      <li className="h-full w-full">
        <NavLinkServer
          className="flex-col p-2 px-4"
          activeClassName="bg-white border-l border-gray-200 text-primary-700 font-bold"
          href={linkToClassement}
          icon={AmisIcon}
          data-cypress-id="amis-link">
          <Trans locale={locale}>Groupes</Trans>
        </NavLinkServer>
      </li>
    </ul>
  )
}
