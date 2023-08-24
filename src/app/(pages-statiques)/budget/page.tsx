'use client'

import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'
import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import contentEnBottom from '@/locales/pages/en-us/budgetBottom.mdx'
import contentEnTop from '@/locales/pages/en-us/budgetTop.mdx'
import contentFrBottom from '@/locales/pages/fr/budgetBottom.mdx'
import contentFrTop from '@/locales/pages/fr/budgetTop.mdx'
import SelectYear from './_components/SelectYear'

export default function Budget() {
	const locale = useLocale()

	const BudgetContentTop = getLocalisedMDX({
		dictionnaries: {
			fr: contentFrTop,
			'en-US': contentEnTop,
		},
		locale: locale ?? '',
	})

	const BudgetContentBottom = getLocalisedMDX({
		dictionnaries: {
			fr: contentFrBottom,
			'en-US': contentEnBottom,
		},
		locale: locale ?? '',
	})

	return (
		<PageLayout shouldShowMenu>
			<Main className="max-w-[800px] p-8">
				{/*
      <Meta
				title={t('meta.publicodes.Budget.title')}
				description={t('meta.publicodes.Budget.description')}
			/>
      */}

				<BudgetContentTop />
				<SelectYear />
				<BudgetContentBottom />
			</Main>
		</PageLayout>
	)
}
