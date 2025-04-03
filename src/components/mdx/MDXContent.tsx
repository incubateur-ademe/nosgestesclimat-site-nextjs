import { getLocalisedMDX } from '@/helpers/getLocalisedMDX'
import type { MDXProps } from 'mdx/types'
import type { JSX } from 'react'

type Props = {
  contentFr: (props: MDXProps) => JSX.Element
  contentEn?: (props: MDXProps) => JSX.Element
  contentEs?: (props: MDXProps) => JSX.Element
  locale: string
}

export default function MDXContent({
  contentFr,
  contentEn,
  contentEs,
  locale,
}: Props) {
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
