import DiffuserEn from '@/locales/pages/en-us/diffuser.mdx'
import DiffuserFr from '@/locales/pages/fr/diffuser.mdx'

import Main from '@/design-system/layout/Main'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'

import { currentLocale } from 'next-i18n-router'

export default async function Diffuser() {
	const locale = currentLocale()

	const DiffuserLocalised = getLocalisedMDX({
		dictionnaries: {
			fr: DiffuserFr,
			'en-US': DiffuserEn,
		},
		locale: locale ?? '',
	})

	return (
		<Main>
			<DiffuserLocalised />
		</Main>
	)
}
