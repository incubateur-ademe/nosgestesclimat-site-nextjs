'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  ACTIONS_PATH,
  ACTIONS_SUGGESTED_PATH,
  END_PAGE_GROUPS_PATH,
  END_PAGE_PATH,
  MON_ESPACE_GROUPS_PATH,
  MON_ESPACE_PATH,
  MON_ESPACE_SETTINGS_PATH,
} from '@/constants/urls/paths'
import type { TabItem } from '@/design-system/layout/Tabs'
import Tabs from '@/design-system/layout/Tabs'
import { useShouldHideIfIframe } from '@/hooks/iframe/useShouldHideIfIframe'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'cn'
import { usePathname } from 'next/navigation'

type TabId = 'results' | 'actions' | 'groups' | 'settings'

// The pathname may be prefixed by the locale, hence the loose matching.
function getActiveTab(pathname: string): TabId {
  if (pathname.includes(`${ACTIONS_PATH}/`)) return 'actions'
  if (pathname.endsWith('/groupes')) return 'groups'
  if (pathname.endsWith('/parametres')) return 'settings'
  return 'results'
}

interface Props {
  isAuth: boolean
}

export default function UserSpaceTabs({ isAuth }: Props) {
  const pathname = usePathname()
  const { t } = useClientTranslation()

  const shouldHideGroupTabInIframe = useShouldHideIfIframe({
    hideIfNotFrenchRegion: true,
  })

  const activeTab = getActiveTab(pathname)
  const shouldHideGroupTab = !isAuth && shouldHideGroupTabInIframe

  const tabsItems: TabItem[] = [
    {
      id: 'results',
      label: (
        <span
          className="flex flex-col items-center gap-1 md:flex-row"
          data-testid="my-results-tab">
          <BilanIcon
            className={twMerge(
              'h-6 w-6',
              activeTab === 'results' ? 'fill-primary-600' : 'fill-default'
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
      href: isAuth ? MON_ESPACE_PATH : END_PAGE_PATH,
      isActive: activeTab === 'results',
      prefetch: false,
    },
    {
      id: 'actions',
      label: (
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <ActionsIcon
            className={twMerge(
              'h-6 w-6',
              activeTab === 'actions' ? 'fill-primary-600' : 'fill-default'
            )}
          />
          <span className="hidden md:block">
            <Trans i18nKey="mon-espace.tabs.myActions">J'agis</Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.actions">J'agis</Trans>
          </span>
        </span>
      ),
      href: ACTIONS_SUGGESTED_PATH,
      isActive: activeTab === 'actions',
      prefetch: false,
    },
    ...(shouldHideGroupTab
      ? []
      : [
          {
            id: 'groups',
            label: (
              <span
                className="flex flex-col items-center gap-1 md:flex-row"
                data-testid="my-groups-tab">
                <AmisIcon
                  className={twMerge(
                    'h-6 w-6',
                    activeTab === 'groups'
                      ? 'stroke-primary-600 fill-primary-600'
                      : 'stroke-default'
                  )}
                />
                {isAuth ? (
                  <>
                    <span className="hidden text-sm sm:block md:text-lg">
                      <Trans i18nKey="mon-espace.tabs.myGroups">
                        Tests collectifs
                      </Trans>
                    </span>
                    <span className="block text-center text-sm sm:hidden">
                      <Trans i18nKey="mon-espace.tabs.groups">Groupes</Trans>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="hidden md:block">
                      <Trans i18nKey="results.tabs.myGroups">
                        Créer un test collectif
                      </Trans>
                    </span>
                    <span className="block text-center text-sm md:hidden">
                      <Trans i18nKey="results.tabs.groups">
                        Test collectif
                      </Trans>
                    </span>
                  </>
                )}
              </span>
            ),
            href: isAuth ? MON_ESPACE_GROUPS_PATH : END_PAGE_GROUPS_PATH,
            isActive: activeTab === 'groups',
            prefetch: false,
          },
        ]),
    ...(isAuth
      ? [
          {
            id: 'settings',
            label: (
              <span className="flex flex-col items-center gap-1 md:flex-row">
                <SettingsIcon
                  className={twMerge(
                    'h-6 w-6',
                    activeTab === 'settings'
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
            isActive: activeTab === 'settings',
            containerClassName: 'md:ml-auto',
            prefetch: false,
          },
        ]
      : []),
  ]

  return (
    <Tabs
      items={tabsItems}
      className="mb-6 md:mb-8"
      ariaLabel={t('Navigation de mon espace')}
      containerId="user-space-tabs"
    />
  )
}
