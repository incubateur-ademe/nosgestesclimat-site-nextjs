'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  captureClickMonEspaceTab,
  monEspaceTabTrackEvent,
} from '@/constants/tracking/pages/mon-espace'
import {
  MON_ESPACE_ACTIONS_PATH,
  MON_ESPACE_GROUPS_PATH,
  MON_ESPACE_PATH,
  MON_ESPACE_SETTINGS_PATH,
} from '@/constants/urls/paths'
import type { TabItem } from '@/design-system/layout/Tabs'
import Tabs from '@/design-system/layout/Tabs'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Locale } from '@/i18nConfig'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const { t } = useClientTranslation()
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
            <Trans i18nKey="mon-espace.tabs.myResults">Mes résultats</Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.results">Résultats</Trans>
          </span>
        </span>
      ),
      href: MON_ESPACE_PATH,
      isActive: activePath === MON_ESPACE_PATH,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (activePath !== MON_ESPACE_PATH) {
          trackEvent(monEspaceTabTrackEvent('results'))
          trackPosthogEvent(captureClickMonEspaceTab({ tab: 'results' }))
          router.push(MON_ESPACE_PATH)
        }
      },
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
            <Trans i18nKey="mon-espace.tabs.myActions">Mes actions</Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.actions">Actions</Trans>
          </span>
        </span>
      ),
      href: MON_ESPACE_ACTIONS_PATH,
      isActive: activePath === MON_ESPACE_ACTIONS_PATH,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (activePath !== MON_ESPACE_ACTIONS_PATH) {
          trackEvent(monEspaceTabTrackEvent('actions'))
          trackPosthogEvent(captureClickMonEspaceTab({ tab: 'actions' }))
          router.push(MON_ESPACE_ACTIONS_PATH)
        }
      },
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
            <Trans i18nKey="mon-espace.tabs.myGroups">Mes groupes</Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.groups">Groupes</Trans>
          </span>
        </span>
      ),
      href: MON_ESPACE_GROUPS_PATH,
      isActive: activePath === MON_ESPACE_GROUPS_PATH,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (activePath !== MON_ESPACE_GROUPS_PATH) {
          trackEvent(monEspaceTabTrackEvent('groups'))
          trackPosthogEvent(captureClickMonEspaceTab({ tab: 'groups' }))
          router.push(MON_ESPACE_GROUPS_PATH)
        }
      },
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
            <Trans i18nKey="mon-espace.tabs.settings">Paramètres</Trans>
          </span>
        </span>
      ),
      href: MON_ESPACE_SETTINGS_PATH,
      isActive: activePath === MON_ESPACE_SETTINGS_PATH,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        if (activePath !== MON_ESPACE_SETTINGS_PATH) {
          trackEvent(monEspaceTabTrackEvent('settings'))
          trackPosthogEvent(captureClickMonEspaceTab({ tab: 'settings' }))
          router.push(MON_ESPACE_SETTINGS_PATH)
        }
      },
      containerClassName: 'md:ml-auto',
    },
  ]
  return (
    <Tabs
      items={tabsItems}
      className="mb-8"
      ariaLabel={t('Navigation de mon espace')}
      containerId="mon-espace-tabs"
      isLocked={isLocked}
    />
  )
}
