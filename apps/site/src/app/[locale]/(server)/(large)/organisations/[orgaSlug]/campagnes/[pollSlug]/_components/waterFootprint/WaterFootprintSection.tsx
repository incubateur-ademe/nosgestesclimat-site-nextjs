import Trans from '@/components/translation/trans/TransClient'
import { eauMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useLocale } from '@/hooks/useLocale'
import { twMerge } from 'tailwind-merge'
import WaterFootprintCard from './waterFootprintSection/WaterFootprintCard'

const DEFAULT_LEARN_MORE_HREF =
  '/blog/environnement/lexique-eau-tout-comprendre'

interface Props {
  meanWaterFootprintLitresPerDay: number
  simulationsCount: number
  learnMoreHref?: string
  className?: string
}

export default function WaterFootprintSection({
  meanWaterFootprintLitresPerDay,
  simulationsCount,
  learnMoreHref = DEFAULT_LEARN_MORE_HREF,
  className,
}: Props) {
  const locale = useLocale()

  if (simulationsCount < 3 || meanWaterFootprintLitresPerDay <= 0) {
    return null
  }

  const { formattedValue } = formatFootprint(meanWaterFootprintLitresPerDay, {
    metric: eauMetric,
    shouldDivideBy365: false,
    maximumFractionDigits: 0,
    localize: true,
    locale,
  })

  return (
    <section
      className={twMerge('mb-8', className)}
      data-testid="water-footprint-section">
      <h2 className="mb-4">
        <Trans i18nKey="pollResults.waterFootprint.title">
          Et à propos de l'empreinte eau ?
        </Trans>
      </h2>

      <WaterFootprintCard
        formattedValue={formattedValue}
        learnMoreHref={learnMoreHref}
      />
    </section>
  )
}
