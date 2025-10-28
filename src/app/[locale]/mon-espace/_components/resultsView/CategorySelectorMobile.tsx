'use client'

import Trans from '@/components/translation/trans/TransClient'
import { orderedCategories } from '@/constants/model/orderedCategories'
import Alert from '@/design-system/alerts/alert/Alert'
import SelectInput from '@/design-system/inputs/SelectInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type TabId = 'global' | DottedName

type Props = {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  categoryLabels: Partial<Record<DottedName, string>>
}

export default function CategorySelectorMobile({
  activeTab,
  setActiveTab,
  categoryLabels,
}: Props) {
  const { t } = useClientTranslation()

  const globalLabel = t('mon-espace.evolutionGraph.tabs.global', 'Vue globale')

  const options: { value: TabId; label: string }[] = [
    { value: 'global', label: globalLabel },
    ...orderedCategories.map((category) => ({
      value: category,
      label: categoryLabels[category] || category,
    })),
  ]

  return (
    <div className="mb-6 md:hidden">
      <h3 className="mb-2 text-base font-bold">
        <Trans i18nKey="mon-espace.evolutionGraph.selectView">
          Sélectionner la vue à afficher
        </Trans>
      </h3>
      <SelectInput
        name="category-selector"
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value as TabId)}
        containerClassName="w-full">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectInput>

      <Alert
        type="default"
        className="mt-4 text-sm"
        description={
          <strong>
            <Trans i18nKey="mon-espace.evolutionGraph.selectView.description">
              Retournez votre mobile pour un affichage optimal
            </Trans>
          </strong>
        }
        id="evolution-chart-mobile-description"
      />
    </div>
  )
}
