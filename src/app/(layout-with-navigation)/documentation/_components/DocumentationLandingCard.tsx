'use client'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { NGCRule } from '@/publicodes-state/types'
import Markdown from 'markdown-to-jsx'
import { utils } from 'publicodes'

type Props = {
  edito: string
  rule: NGCRule
}
export default function DocumentationLandingCard({ edito, rule }: Props) {
  const category = edito.split(' . ')[0]

  return (
    <Card
      tag={Link}
      href={'/documentation/' + utils.encodeRuleName(edito)}
      className={`relative !flex h-[12rem] flex-auto justify-center text-center text-base text-white no-underline ${getBackgroundColor(
        category
      )}`}>
      <p className="-z-1 absolute bottom-0 left-0 right-0 top-0 text-center align-middle text-[8.5rem] opacity-20 grayscale">
        {rule['icônes']}
      </p>
      <h2 className="z-10 mb-0 text-base text-white">
        {<Markdown>{rule['résumé'] || '...'}</Markdown>}
      </h2>
    </Card>
  )
}
