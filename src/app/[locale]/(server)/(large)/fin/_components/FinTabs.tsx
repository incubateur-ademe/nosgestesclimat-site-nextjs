'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  captureClickFinTab,
  finTabTrackEvent,
} from '@/constants/tracking/pages/end'
import { END_PAGE_PATH } from '@/constants/urls/paths'
import type { TabItem } from '@/design-system/layout/Tabs'
import Tabs from '@/design-system/layout/Tabs'
import { useShouldHideIfIframe } from '@/hooks/iframe/useShouldHideIfIframe'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { usePathname, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type TabsType = 'results' | 'actions' | 'groups'

export default function FinTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useClientTranslation()
  const resultsHref = `${END_PAGE_PATH}`
  const actionsHref = `${END_PAGE_PATH}/actions`
  const groupsHref = `${END_PAGE_PATH}/groupes`

  const handleTabClick = (tab: TabsType) => {
    if (tab === 'results') {
      trackEvent(finTabTrackEvent('results'))
      trackPosthogEvent(captureClickFinTab({ tab: 'results' }))
      router.replace(resultsHref)
    } else if (tab === 'actions') {
      trackEvent(finTabTrackEvent('actions'))
      trackPosthogEvent(captureClickFinTab({ tab: 'actions' }))
      router.replace(actionsHref)
    } else {
      trackEvent(finTabTrackEvent('groups'))
      trackPosthogEvent(captureClickFinTab({ tab: 'groups' }))
      router.replace(groupsHref)
    }
  }

  const isActionsActive = pathname.endsWith('actions')
  const isGroupsActive = pathname.endsWith('groupes')
  const isResultsActive = !isActionsActive && !isGroupsActive

  const shouldHideGroupTab = useShouldHideIfIframe({
    hideIfNotFrenchRegion: true,
  })

  const tabsItems: TabItem[] = [
    {
      id: 'results',
      label: (
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <BilanIcon
            className={twMerge(
              'h-6 w-6',
              isResultsActive ? 'fill-primary-600' : 'fill-default'
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
      href: resultsHref,
      isActive: isResultsActive,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        handleTabClick('results')
      },
    },
    {
      id: 'actions',
      label: (
        <span className="flex flex-col items-center gap-1 md:flex-row">
          <ActionsIcon
            className={twMerge(
              'h-6 w-6',
              isActionsActive ? 'fill-primary-600' : 'fill-default'
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
      href: actionsHref,
      isActive: isActionsActive,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        handleTabClick('actions')
      },
    },
    ...(!shouldHideGroupTab
      ? [
          {
            id: 'groups',
            label: (
              <span
                className="flex flex-col items-center gap-1 md:flex-row"
                data-testid="my-groups-tab">
                <AmisIcon
                  className={twMerge(
                    'h-6 w-6',
                    isGroupsActive
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
            href: groupsHref,
            isActive: isGroupsActive,
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              handleTabClick('groups')
            },
          },
        ]
      : []),
  ]

  return (
    <Tabs
      items={tabsItems}
      className="mb-12"
      ariaLabel={t('Navigation de mon espace')}
      containerId="fin-tabs"
      isLocked={false}
    />
  )
}
