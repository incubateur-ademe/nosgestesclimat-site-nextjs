import Trans from '@/components/translation/trans/TransClient'
import { orderedCategories } from '@/constants/model/orderedCategories'
import Tabs, { type TabItem } from '@/design-system/layout/Tabs'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type TabId = 'global' | DottedName

type Props = {
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
        if (!disabled) setActiveTab('global')
      },
      'aria-disabled': disabled,
    },
    ...orderedCategories.map((category) => ({
      id: category,
      label: categoryLabels[category] ?? category,
      isActive: activeTab === category,
      onClick: () => {
        if (!disabled) setActiveTab(category)
      },
      'aria-disabled': disabled,
    })),
  ]

  return (
    <div className="mb-6 hidden md:block">
      <Tabs
        items={tabsItems}
        ariaLabel="Navigation par catégorie"
        isLocked={disabled}
      />
    </div>
  )
}
