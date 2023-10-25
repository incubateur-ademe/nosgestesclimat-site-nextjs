import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useGetResultsFromDetailParam } from '@/hooks/useGetResultsFromDetailParam'
import { useLocale } from '@/hooks/useLocale'

type Props = { number: number; isTotal?: boolean }

export default function NumberDisplay({ number, isTotal }: Props) {
  const { t } = useClientTranslation()
  const locale = useLocale()
  const resultFromURL = useGetResultsFromDetailParam()

  const total = (isTotal && resultFromURL?.bilan) || number

  return (
    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap text-base text-black">
      <span className="text-3xl font-bold md:text-5xl">
        {(total / 1000).toLocaleString(locale, {
          maximumFractionDigits: 1,
        })}
      </span>{' '}
      {t('tonnes')}
    </div>
  )
}
