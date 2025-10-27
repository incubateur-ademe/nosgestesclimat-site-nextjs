import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'
import WaterTotalNumberServer from './waterTotalChart/WaterTotalNumberServer'
import WaveContent from './waterTotalChart/WaveContent'

type Props = { total: number; locale: Locale }
export default function WaterTotalChartServer({ total, locale }: Props) {
  return (
    <div
      className={twMerge(
        'relative flex h-full w-full flex-1 flex-col justify-between overflow-hidden'
      )}>
      <WaterTotalNumberServer total={total} locale={locale} />
      <WaveContent />
    </div>
  )
}
