import Main from '@/design-system/layout/Main'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import CGUEn from '@/locales/pages/en-us/CGU.mdx'
import CGUFr from '@/locales/pages/fr/CGU.mdx'
import { currentLocale } from 'next-i18n-router'
// import contentEs from '@/locales/pages/es/CGU.md'
// import contentIt from '@/locales/pages/it/CGU.md'

export default async function CGU() {
	const locale = currentLocale()

	const CGULocalised = getLocalisedMDX({
		dictionnaries: {
			fr: CGUFr,
			'en-US': CGUEn,
		},
		locale: locale ?? '',
	})

	return (
		<Main>
			<CGULocalised />
		</Main>
	)
}
