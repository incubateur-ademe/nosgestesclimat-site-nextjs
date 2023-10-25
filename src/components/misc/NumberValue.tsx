import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'

type Props = {
  displayValue: string | number
  unit?: string
}

export default function NumberValue({ displayValue, unit }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  return (
    <>
      {displayValue
        .toLocaleString(locale, {
          maximumFractionDigits: 2,
        })
        .replaceAll("'", '')}{' '}
      {t(unit ?? '')}
    </>
  )
}
