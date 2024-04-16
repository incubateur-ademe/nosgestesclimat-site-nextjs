import { getServerTranslation } from '@/helpers/getServerTranslation'
import { TransPropsWithInterpolation } from '@/types/translation'
import { ReactElement } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

export default async function TransServer({
  children,
  i18nKey,
}: TransPropsWithInterpolation): Promise<ReactElement> {
  const { t } = await getServerTranslation()

  return (
    <Trans i18nKey={i18nKey} t={t}>
      {children}
    </Trans>
  )
}
