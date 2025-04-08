import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { TransPropsWithInterpolation } from '@/types/translation'
import type { ReactElement } from 'react'
import { Trans as TransReactI18n } from 'react-i18next'

export default async function Trans({
  locale,
  children,
  i18nKey,
}: TransPropsWithInterpolation & { locale: string }): Promise<ReactElement> {
  const { t } = await getServerTranslation({ locale })

  return (
    <TransReactI18n i18nKey={i18nKey} t={t}>
      {children}
    </TransReactI18n>
  )
}
