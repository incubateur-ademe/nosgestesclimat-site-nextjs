import Trans from '@/components/translation/trans/TransServer'
import { formatWaterFootprint } from '@/helpers/formatters/formatWaterFootprint'
import type { Locale } from '@/i18nConfig'

const average = 149

interface Props {
  locale: Locale
  domesticWaterValue: number
}

export default function DomesticWaterBlock({
  locale,
  domesticWaterValue,
}: Props) {
  const { formattedValue, unit } = formatWaterFootprint(domesticWaterValue, {
    locale,
  })

  return (
    <div className="mb-6 self-center">
      <div className="bg-water flex gap-4 rounded-xl p-4 lg:pr-8">
        <svg
          className="h-auto fill-white lg:w-14"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M37.7916 23.6907L24.197 1.45337L11.5996 23.5387C8.66632 28.2187 8.41032 34.304 11.4916 39.344C15.8716 46.508 25.309 48.808 32.573 44.4867C39.8343 40.1667 42.1716 30.86 37.7916 23.6907Z" />
        </svg>
        <p className="mb-0 text-white lg:text-xl">
          <Trans
            locale={locale}
            i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.youUse">
            Vous utilisez
          </Trans>{' '}
          <br className="hidden lg:inline" />
          <strong className="font-black">
            {formattedValue}{' '}
            <Trans
              locale={locale}
              i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.unit">
              {unit}
            </Trans>
          </strong>{' '}
          <Trans
            locale={locale}
            i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.perDay">
            d'eau domestique par jour
          </Trans>
        </p>
      </div>
      <p className="mb-0 w-full text-center text-sm italic">
        <Trans
          locale={locale}
          i18nKey="simulTrans.eau.whatIsWaterFootprint.showerWater.average">
          *La moyenne française est de
        </Trans>{' '}
        {average}{' '}
        <Trans
          locale={locale}
          i18nKey="simulation.eau.whatIsWaterFootprint.showerWater.perDay">
          litres par jour
        </Trans>
      </p>
    </div>
  )
}
