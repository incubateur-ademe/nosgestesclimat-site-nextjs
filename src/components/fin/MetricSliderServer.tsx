import CarboneTotalChartServer from '@/components/fin/metricSlider/CarboneTotalChartServer'
import MetricCardServer from '@/components/fin/metricSlider/MetricCardServer'
import WaterTotalChartServer from '@/components/fin/metricSlider/WaterTotalChartServer'
import { carboneMetric, eauMetric } from '@/constants/model/metric'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'

type Props = {
  carboneTotal: number
  waterTotal: number
  locale: Locale
  className?: string
}

export default async function MetricSliderServer({
  carboneTotal,
  waterTotal,
  locale,
  className,
}: Props) {
  const { t } = await getServerTranslation({ locale })

  return (
    <div className={twMerge('', className)}>
      <div
        className={twMerge(
          'relative mx-auto -mt-0.5 flex w-full gap-0 px-0',
          'h-28 md:h-72 lg:h-80'
        )}>
        <MetricCardServer
          metric={carboneMetric}
          metricTitle={{
            desktop: t(
              'results.metricSlider.carbon.desktop.title',
              'Mon empreinte carbone'
            ),
            mobile: t(
              'results.metricSlider.carbon.desktop.mobile',
              'Empreinte carbone'
            ),
          }}>
          <div className="w-full flex-1 px-4">
            <CarboneTotalChartServer total={carboneTotal} locale={locale} />
          </div>
        </MetricCardServer>

        <MetricCardServer
          metric={eauMetric}
          metricTitle={{
            desktop: t(
              'results.metricSlider.water.desktop.title',
              'Mon empreinte eau'
            ),
            mobile: t(
              'results.metricSlider.water.desktop.mobile',
              'Empreinte eau'
            ),
          }}>
          <WaterTotalChartServer total={waterTotal} locale={locale} />
        </MetricCardServer>
      </div>
    </div>
  )
}
