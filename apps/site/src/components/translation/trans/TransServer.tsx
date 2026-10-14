import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { TransPropsWithInterpolation } from '@/types/translation'
import type { ReactElement } from 'react'
import { Trans as TransReactI18n } from 'react-i18next/TransWithoutContext'

export default async function TransServer({
  children,
  i18nKey,
  values,
}: TransPropsWithInterpolation): Promise<ReactElement> {
  const { t } = await getServerTranslation()

  return (
    <TransReactI18n
      i18nKey={i18nKey}
      t={t}
      values={values}
      tOptions={{ interpolation: { escapeValue: false } }}>
      {children}
    </TransReactI18n>
  )
}
