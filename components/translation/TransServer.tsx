import { useServerTranslation } from '@/locales'
import { PropsWithChildren } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

export default async function TransServer({
	children,
	lang,
	i18nKey,
}: PropsWithChildren<{ lang: string; i18nKey?: string }>) {
	const { t } = await useServerTranslation(lang)

	return (
		<Trans i18nKey={i18nKey} t={t}>
			{children}
		</Trans>
	)
}
