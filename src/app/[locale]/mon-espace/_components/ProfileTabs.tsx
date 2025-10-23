import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import Trans from '@/components/translation/trans/TransServer'
import {
  MON_ESPACE_ACTIONS_PATH,
  MON_ESPACE_GROUPS_PATH,
  MON_ESPACE_PATH,
  MON_ESPACE_SETTINGS_PATH,
} from '@/constants/urls/paths'
import type { TabItem } from '@/design-system/layout/Tabs'
import Tabs from '@/design-system/layout/Tabs'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'

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
          <BilanIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_PATH
                ? 'fill-primary-600'
                : 'fill-default'
            )}
          />
          <Trans i18nKey="mon-espace.tabs.results" locale={locale}>
            Mes résultats
          </Trans>
        </span>
      ),
      href: MON_ESPACE_PATH,
      isActive: activePath === MON_ESPACE_PATH,
      'data-track-event': 'Mon Espace|Click Tab|Results',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"results"}}',
    },
    {
      id: 'actions',
      label: (
        <span className="flex items-center gap-1">
          <ActionsIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_ACTIONS_PATH
                ? 'fill-primary-600'
                : 'fill-default'
            )}
          />
          <Trans i18nKey="mon-espace.tabs.actions" locale={locale}>
            Mes actions
          </Trans>
        </span>
      ),
      href: MON_ESPACE_ACTIONS_PATH,
      isActive: activePath === MON_ESPACE_ACTIONS_PATH,
      'data-track-event': 'Mon Espace|Click Tab|Actions',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"actions"}}',
    },
    {
      id: 'groups',
      label: (
        <span className="flex items-center gap-1">
          <AmisIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_GROUPS_PATH
                ? 'stroke-primary-600 fill-primary-600'
                : 'stroke-default'
            )}
          />
          <Trans i18nKey="mon-espace.tabs.groups" locale={locale}>
            Mes groupes
          </Trans>
        </span>
      ),
      href: MON_ESPACE_GROUPS_PATH,
      isActive: activePath === MON_ESPACE_GROUPS_PATH,
      'data-track-event': 'Mon Espace|Click Tab|Groups',
      'data-track-posthog':
        '{"eventName":"click tab mon espace","properties":{"tab":"groups"}}',
    },
    {
      id: 'settings',
      label: (
        <span className="flex items-center gap-1">
          <SettingsIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_SETTINGS_PATH
                ? 'fill-primary-600'
                : 'fill-default'
            )}
          />
          <Trans i18nKey="mon-espace.tabs.settings" locale={locale}>
            Paramètres
          </Trans>
        </span>
      ),
      href: MON_ESPACE_SETTINGS_PATH,
      isActive: activePath === MON_ESPACE_SETTINGS_PATH,
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
