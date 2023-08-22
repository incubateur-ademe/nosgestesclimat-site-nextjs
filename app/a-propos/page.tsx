'use client'

import { useLang } from '@/contexts/LangContext'
import Main from '@/design-system/layout/Main'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import CGUEn from '@/locales/pages/en-us/CGU.mdx'
import CGUFr from '@/locales/pages/fr/CGU.mdx'
// import contentEs from '@/locales/pages/es/CGU.md'
// import contentIt from '@/locales/pages/it/CGU.md'

export default async function CGU() {
	const locale = useLang()

	const CGULocalised = getLocalisedMDX({
		dictionnaries: {
			fr: CGUFr,
			'en-US': CGUEn,
		},
		locale: locale ?? '',
	})
	console.log(CGULocalised, typeof CGULocalised)
	return (
		<Main>
			<CGULocalised />
		</Main>
	)
}
