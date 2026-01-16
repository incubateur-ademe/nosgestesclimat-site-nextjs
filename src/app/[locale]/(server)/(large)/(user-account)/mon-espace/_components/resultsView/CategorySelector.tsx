import Trans from '@/components/translation/trans/TransClient'
import { orderedCategories } from '@/constants/model/orderedCategories'
import {
  captureClickCategorySelector,
  clickCategorySelector,
} from '@/constants/tracking/user-account'
import Tabs, { type TabItem } from '@/design-system/layout/Tabs'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

type TabId = 'global' | DottedName

interface Props {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  categoryLabels: Partial<Record<DottedName, string>>
  disabled?: boolean
}

export default function CategorySelector({
  activeTab,
  setActiveTab,
  categoryLabels,
  disabled = false,
}: Props) {
  const globalTabId = 'global'
  const tabsItems: TabItem[] = [
    {
      id: globalTabId,
      label: (
        <Trans i18nKey="mon-espace.evolutionGraph.tabs.global">
          Vue globale
        </Trans>
      ),
      isActive: activeTab === globalTabId,
      onClick: () => {
        if (!disabled) {
          setActiveTab('global')
          trackEvent(clickCategorySelector('bilan'))
          trackPosthogEvent(captureClickCategorySelector('bilan'))
        }
      },
      'aria-disabled': disabled,
    },
    ...orderedCategories.map((category) => ({
      id: category,
      label: categoryLabels[category] ?? category,
      isActive: activeTab === category,
      onClick: () => {
        if (!disabled) {
          setActiveTab(category)
          trackEvent(clickCategorySelector(category))
          trackPosthogEvent(captureClickCategorySelector(category))
        }
      },
      'aria-disabled': disabled,
    })),
  ]

  return (
    <div
      className={twMerge('mb-6 hidden md:block', disabled ? 'opacity-50' : '')}>
      <Tabs
        items={tabsItems}
        ariaLabel="Navigation par catégorie"
        isLocked={disabled}
      />
    </div>
  )
}
