import { MDXProps } from 'mdx/types'

type Props = {
	dictionnaries: {
		fr: (props: MDXProps) => JSX.Element
		'en-US': (props: MDXProps) => JSX.Element
	}
	locale: string
}

export const getLocalisedMDX = ({ dictionnaries, locale }: Props) => {
	switch (locale) {
		case 'en-US':
			return dictionnaries['en-US']
		case 'fr':
		default:
			return dictionnaries.fr
	}
}
