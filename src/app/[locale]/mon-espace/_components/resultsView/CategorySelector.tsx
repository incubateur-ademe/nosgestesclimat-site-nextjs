import Trans from '@/components/translation/trans/TransClient'
import { orderedCategories } from '@/constants/model/orderedCategories'
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
  return (
    <div className="mb-6 hidden border-b-2 border-slate-200 md:block">
      <nav aria-label="Navigation par catégorie">
        <ul className="flex items-end gap-0 md:gap-4">
          {/* Global view tab */}
          <li className="translate-y-0.5">
            <button
              role="tab"
              aria-current={activeTab === 'global'}
              aria-selected={activeTab === 'global'}
              aria-disabled={disabled}
              className={`inline-block px-1 py-3 text-base md:px-4 md:text-lg ${
                activeTab === 'global'
                  ? 'border-primary-600 text-primary-600 border-b-3 font-bold'
                  : 'border-b-3 border-transparent text-slate-600'
              } ${disabled ? 'cursor-not-allowed' : ''}`}
              onClick={disabled ? () => {} : () => setActiveTab('global')}>
              <Trans i18nKey="mon-espace.evolutionGraph.tabs.global">
                Vue globale
              </Trans>
            </button>
          </li>

          {/* Category tabs */}
          {orderedCategories.map((category) => (
            <li key={category} className="translate-y-0.5">
              <button
                role="tab"
                aria-current={activeTab === category}
                aria-selected={activeTab === category}
                aria-disabled={disabled}
                className={`inline-block px-1 py-3 text-base md:px-4 md:text-lg ${
                  activeTab === category
                    ? 'border-primary-600 text-primary-600 border-b-3 font-bold'
                    : 'border-b-3 border-transparent text-slate-600'
                } ${disabled ? 'cursor-not-allowed' : ''}`}
                onClick={disabled ? () => {} : () => setActiveTab(category)}>
                {categoryLabels[category]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
