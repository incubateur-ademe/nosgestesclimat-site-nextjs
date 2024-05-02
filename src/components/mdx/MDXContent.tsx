import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import { MDXProps } from 'mdx/types'
import { currentLocale } from 'next-i18n-router'
import { JSX } from 'react'

type Props = {
  contentFr: (props: MDXProps) => JSX.Element
  contentEn?: (props: MDXProps) => JSX.Element
  contentEs?: (props: MDXProps) => JSX.Element
}

export default function MDXContent({ contentFr, contentEn, contentEs }: Props) {
  const locale = currentLocale()

  const Content = getLocalisedMDX({
    dictionnaries: {
      fr: contentFr,
      en: contentEn || contentFr,
      es: contentEs || contentFr,
    },
    locale: locale ?? 'fr',
  })

  return (
    <div className="markdown">
      <Content />
    </div>
  )
}
