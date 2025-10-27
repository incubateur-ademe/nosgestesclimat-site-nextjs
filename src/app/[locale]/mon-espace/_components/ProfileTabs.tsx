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
  isLocked = false,
}: {
  locale: Locale
  activePath: string
  isLocked?: boolean
}) {
  const tabsItems: TabItem[] = [
    {
      id: 'dashboard',
      label: (
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <BilanIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_PATH
                ? 'fill-primary-600'
                : 'fill-default'
            )}
          />
          <span className="hidden md:block">
            <Trans i18nKey="mon-espace.tabs.myResults" locale={locale}>
              Mes résultats
            </Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.results" locale={locale}>
              Résultats
            </Trans>
          </span>
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
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <ActionsIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_ACTIONS_PATH
                ? 'fill-primary-600'
                : 'fill-default'
            )}
          />
          <span className="hidden md:block">
            <Trans i18nKey="mon-espace.tabs.myActions" locale={locale}>
              Mes actions
            </Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.actions" locale={locale}>
              Actions
            </Trans>
          </span>
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
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <AmisIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_GROUPS_PATH
                ? 'stroke-primary-600 fill-primary-600'
                : 'stroke-default'
            )}
          />
          <span className="hidden md:block">
            <Trans i18nKey="mon-espace.tabs.myGroups" locale={locale}>
              Mes groupes
            </Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.groups" locale={locale}>
              Groupes
            </Trans>
          </span>
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
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <SettingsIcon
            className={twMerge(
              'h-6 w-6',
              activePath === MON_ESPACE_SETTINGS_PATH
                ? 'fill-primary-600'
                : 'fill-default'
            )}
          />
          <span className="text-sm md:text-base">
            <Trans i18nKey="mon-espace.tabs.settings" locale={locale}>
              Paramètres
            </Trans>
          </span>
        </span>
      ),
      href: MON_ESPACE_SETTINGS_PATH,
      isActive: activePath === MON_ESPACE_SETTINGS_PATH,
      containerClassName: 'md:ml-auto',
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
      isLocked={isLocked}
    />
  )
}
