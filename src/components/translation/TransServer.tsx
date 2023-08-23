'server only'
import { useServerTranslation } from '@/locales'
import { PropsWithChildren } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

export default async function TransServer({
	children,
	i18nKey,
}: PropsWithChildren<{ i18nKey?: string }>) {
	const { t } = await useServerTranslation()

	return (
		<Trans i18nKey={i18nKey} t={t}>
			{children}
		</Trans>
	)
}
