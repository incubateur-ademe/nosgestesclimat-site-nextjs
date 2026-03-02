import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'
import DownArrow from '../icons/DownArrow'
import Trans from '../translation/trans/TransServer'

export type Tendency = 'increase' | 'decrease' | undefined

export default function TendencyIndicator({
  tendency,
  locale,
}: {
  tendency: Tendency
  locale: Locale
}) {
  return (
    <div className="flex gap-1">
      <DownArrow
        className={twMerge(
          tendency === 'increase'
            ? 'rotate-180 fill-green-700'
            : 'rotate-90 fill-red-700'
        )}
      />
      {tendency === 'increase' && (
        <Trans locale={locale} i18nKey="carbonResults.tendency.increase">
          En hausse depuis votre dernier résultat
        </Trans>
      )}
      {tendency === 'decrease' && (
        <Trans locale={locale} i18nKey="carbonResults.tendency.decrease">
          En baisse depuis votre dernier résultat
        </Trans>
      )}
    </div>
  )
}
