import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import Trans from '@/components/translation/trans/TransServer'
import type { TabItem } from '@/design-system/layout/Tabs'
import Tabs from '@/design-system/layout/Tabs'
import type { Locale } from '@/i18nConfig'

export default function ProfileTab({
  locale,
  activePath,
}: {
  locale: Locale
  activePath: string
}) {
  const tabsItems: TabItem[] = [
    {
      id: 'dashboard',
      label: (
        <span className="flex items-center gap-1">
          <BilanIcon className="h-6 w-6" />
          <Trans i18nKey="mon-espace.tabs.results" locale={locale}>
            Mes résultats
          </Trans>
        </span>
      ),
      href: '/mon-espace',
      isActive: activePath === '/mon-espace',
      'data-track-event': 'Mon Espace|Click Tab|Results',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"results"}}',
    },
    {
      id: 'profile',
      label: (
        <span className="flex items-center gap-1">
          <ActionsIcon className="fill-primary-600 h-6 w-6" />
          <Trans i18nKey="mon-espace.tabs.actions" locale={locale}>
            Mes actions
          </Trans>
        </span>
      ),
      href: '/mon-espace/actions',
      isActive: activePath === '/mon-espace/actions',
      'data-track-event': 'Mon Espace|Click Tab|Actions',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"actions"}}',
    },
    {
      id: 'simulations',
      label: (
        <span className="flex items-center gap-1">
          <AmisIcon className="h-6 w-6" />
          <Trans i18nKey="mon-espace.tabs.groups" locale={locale}>
            Mes groupes
          </Trans>
        </span>
      ),
      href: '/mon-espace/groupes',
      isActive: activePath === '/mon-espace/groupes',
      'data-track-event': 'Mon Espace|Click Tab|Groups',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"groups"}}',
    },
    {
      id: 'settings',
      label: (
        <span className="flex items-center gap-1">
          <SettingsIcon className="h-6 w-6" />
          <Trans i18nKey="mon-espace.tabs.settings" locale={locale}>
            Paramètres
          </Trans>
        </span>
      ),
      href: '/mon-espace/parametres',
      isActive: activePath === '/mon-espace/parametres',
      containerClassName: 'ml-auto', // Aligne cet onglet à droite
      'data-track-event': 'Mon Espace|Click Tab|Settings',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"settings"}}',
    },
  ]
  return (
    <Tabs
      items={tabsItems}
      className="mb-8"
      ariaLabel="Navigation de mon espace"
      containerId="mon-espace-tabs"
    />
  )
}
