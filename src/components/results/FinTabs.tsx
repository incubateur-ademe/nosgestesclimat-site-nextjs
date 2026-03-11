'use client'

import ActionsIcon from '@/components/icons/ActionsIcon'
import AmisIcon from '@/components/icons/AmisIcon'
import BilanIcon from '@/components/icons/BilanIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  captureClickFinTab,
  finTabTrackEvent,
} from '@/constants/tracking/pages/end'
import { FIN_TAB_QUERY_PARAM } from '@/constants/urls/params'
import type { TabItem } from '@/design-system/layout/Tabs'
import Tabs from '@/design-system/layout/Tabs'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type TabValue = 'results' | 'actions' | 'groups'

export default function FinTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { t } = useClientTranslation()

  const activeTab = (searchParams?.get(FIN_TAB_QUERY_PARAM) ||
    'results') as TabValue

  const handleTabClick = (tab: TabValue) => {
    if (activeTab === tab) return

    const urlSearchParams = new URLSearchParams(searchParams?.toString())
    if (tab === 'results') {
      urlSearchParams.delete(FIN_TAB_QUERY_PARAM)
    } else {
      urlSearchParams.set(FIN_TAB_QUERY_PARAM, tab)
    }

    const search = urlSearchParams.toString()
    const query = search ? `?${search}` : ''
    router.replace(`${pathname}${query}`)

    // Track events
    if (tab === 'results') {
      trackEvent(finTabTrackEvent('results'))
      trackPosthogEvent(captureClickFinTab({ tab: 'results' }))
    } else if (tab === 'actions') {
      trackEvent(finTabTrackEvent('actions'))
      trackPosthogEvent(captureClickFinTab({ tab: 'actions' }))
    } else if (tab === 'groups') {
      trackEvent(finTabTrackEvent('groups'))
      trackPosthogEvent(captureClickFinTab({ tab: 'groups' }))
    }
  }

  const tabsItems: TabItem[] = [
    {
      id: 'results',
      label: (
        <span className="flex flex-col items-center gap-1 md:flex-row">
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
      href: `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`,
      isActive: activeTab === 'results',
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
              activeTab === 'actions' ? 'fill-primary-600' : 'fill-default'
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
      href: `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`,
      isActive: activeTab === 'actions',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        handleTabClick('actions')
      },
    },
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
          <span className="hidden md:block">
            <Trans i18nKey="mon-espace.tabs.myGroups">Mes groupes</Trans>
          </span>
          <span className="block text-center text-sm md:hidden">
            <Trans i18nKey="mon-espace.tabs.groups">Groupes</Trans>
          </span>
        </span>
      ),
      href: `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`,
      isActive: activeTab === 'groups',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        handleTabClick('groups')
      },
    },
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
