import PlusIcon from '@/components/icons/PlusIcon'
import TotalFootprintNumber from '@/components/misc/TotalFootprintNumber'
import ValueChangeDisplay from '@/components/misc/ValueChangeDisplay'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import CategoriesResultList from './interactiveResultBlock/CategoriesResultList'

export default function InteractiveResultBlock({
  metric,
}: {
  metric: Metrics
}) {
  return (
    <details className="group transition-all duration-200">
      <summary className="relative z-10 flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg border-2 border-primary-100 bg-primary-50 p-4 [&::-webkit-details-marker]:hidden [&::marker]:hidden">
        <div className="relative w-full">
          <div className="flex items-center gap-2">
            <h3 className="mb-0 text-[13px] font-bold md:text-base">
              <TotalFootprintNumber metric={metric} />
            </h3>
          </div>
          <ValueChangeDisplay metric={metric} size="md" />
        </div>

        <PlusIcon className="inline-block h-6 w-6 min-w-6 origin-center transform fill-primary-400 transition-transform duration-300 group-open:rotate-45" />
      </summary>

      <div className="border-primary-10 -z-10 -mt-2 grid cursor-default grid-rows-[0fr] overflow-hidden rounded-b-xl border-2 pt-2 transition-all duration-200 ease-in-out group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="pt-1 text-sm md:text-base">
            <CategoriesResultList metric={metric} />
          </div>
        </div>
      </div>
    </details>
  )
}
