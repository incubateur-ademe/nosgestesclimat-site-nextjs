import TotalFootprintNumber from '@/components/misc/TotalFootprintNumber'
import ValueChangeDisplay from '@/components/misc/ValueChangeDisplay'
import Explanation from '@/components/total/total/Explanation'
import Card from '@/design-system/layout/Card'

export default function ResultsBlocks() {
  return (
    <div className="relative mb-8 grid grid-cols-2 gap-4 md:hidden">
      <Card
        aria-live="polite"
        className="relative col-span-1 rounded-md border-primary-100 bg-primary-50 p-2">
        <TotalFootprintNumber metric="carbone" />

        <ValueChangeDisplay metric="carbone" />
      </Card>
      <Card
        aria-live="polite"
        className="relative col-span-1 rounded-md border-primary-100 bg-primary-50 p-2">
        <TotalFootprintNumber metric="eau" />

        <ValueChangeDisplay metric="eau" />
      </Card>

      <Explanation />
    </div>
  )
}
