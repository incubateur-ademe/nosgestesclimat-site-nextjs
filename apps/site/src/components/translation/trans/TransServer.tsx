import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { TransPropsWithInterpolation } from '@/types/translation'
import type { ReactElement } from 'react'
import { Trans as TransReactI18n } from 'react-i18next/TransWithoutContext'
export default function Trans({
  locale,
  children,
  i18nKey,
  values,
  count,
}: TransPropsWithInterpolation & {
  locale: string
  /**
   * Only read by i18next-parser (`pnpm ui:parse`) to generate the `_one`
   * plural form, which otherwise defaults to the children (plural) text.
   */
  defaultValue_one?: string
}): ReactElement {
  const { t } = getServerTranslation({ locale })

  return (
    <TransReactI18n
      i18nKey={i18nKey}
      t={t}
      values={values}
      count={count}
      tOptions={{ interpolation: { escapeValue: false } }}>
      {children}
    </TransReactI18n>
  )
}
