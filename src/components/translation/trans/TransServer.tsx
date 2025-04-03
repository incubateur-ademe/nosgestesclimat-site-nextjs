import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { TransPropsWithInterpolation } from '@/types/translation'
import type { ReactElement } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

export default async function TransServer({
  locale,
  children,
  i18nKey,
}: TransPropsWithInterpolation & { locale: string }): Promise<ReactElement> {
  const { t } = await getServerTranslation({ locale })

  return (
    <Trans i18nKey={i18nKey} t={t}>
      {children}
    </Trans>
  )
}
