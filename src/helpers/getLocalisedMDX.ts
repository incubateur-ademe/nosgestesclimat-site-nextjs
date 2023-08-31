import { MDXProps } from 'mdx/types'
import React from 'react'

type Props = {
  dictionnaries: {
    fr: (props: MDXProps) => React.JSX.Element
    'en-US': (props: MDXProps) => React.JSX.Element
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
