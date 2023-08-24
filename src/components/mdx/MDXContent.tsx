'use client'

import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { useLocale } from '@/hooks/useLocale'
import { MDXProps } from 'mdx/types'

type Props = {
	contentFr: (props: MDXProps) => JSX.Element
	contentEn: (props: MDXProps) => JSX.Element
}

export default function MDXContent({ contentFr, contentEn }: Props) {
	const locale = useLocale()

	const Content = getLocalisedMDX({
		dictionnaries: {
			fr: contentFr,
			'en-US': contentEn,
		},
		locale: locale ?? '',
	})

	return <Content />
}
