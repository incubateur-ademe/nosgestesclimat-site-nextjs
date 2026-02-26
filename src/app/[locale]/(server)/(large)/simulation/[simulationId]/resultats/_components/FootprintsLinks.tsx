import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransServer'
import Emoji from '@/design-system/utils/Emoji'
import type { Locale } from '@/i18nConfig'
import { twMerge } from 'tailwind-merge'

interface Props {
  locale: Locale
  simulationId: string
  currentPage: 'carbone' | 'eau'
}

export default function FootprintsLinks({
  locale,
  simulationId,
  currentPage,
}: Props) {
  const commonClassName =
    'border border-slate-300 text-default font-medium no-underline py-1 px-3'

  const selectedClassName = 'border-primary-600 text-primary-600'

  return (
    <div className="mb-12 text-right">
      <Link
        className={twMerge(
          commonClassName,
          'rounded-l-sm',
          currentPage === 'carbone' ? selectedClassName : 'border-r-0'
        )}
        href={`/${locale}/simulation/${simulationId}/resultats`}>
        <Trans locale={locale} i18nKey="common.carbonFootprint">
          Empreinte carbone
        </Trans>
      </Link>

      <Link
        className={twMerge(
          commonClassName,
          'rounded-r-sm',
          currentPage === 'eau' ? selectedClassName : 'border-l-0'
        )}
        href={`/${locale}/simulation/${simulationId}/resultats/eau`}>
        <Trans locale={locale} i18nKey="common.waterFootprint">
          Empreinte eau
        </Trans>{' '}
        <Emoji className="text-base">💧</Emoji>
      </Link>
    </div>
  )
}
