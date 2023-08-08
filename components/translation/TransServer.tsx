import { useServerTranslation } from '@/locales'
import { PropsWithChildren } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

export default async function TransServer({
	children,
	locale,
}: PropsWithChildren<{ locale: string }>) {
	const { t } = await useServerTranslation(locale)

	return <Trans t={t}>{children}</Trans>
}
