'use client'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { NGCRule } from '@/publicodes-state/types'
import Markdown from 'markdown-to-jsx'
import { utils } from 'publicodes'

type Props = {
  dottedName: string
  summary: string
  rule: NGCRule
}
export default function DocumentationLandingCard({
  dottedName,
  summary,
  rule,
}: Props) {
  const category = dottedName.split(' . ')[0]

  return (
    <Card
      tag={Link}
      href={'/documentation/' + utils.encodeRuleName(dottedName)}
      className={`relative h-[12rem] flex-auto justify-center rounded-lg text-center text-base text-white no-underline ${getBackgroundColor(
        category
      )}`}>
      <div className="-z-1 absolute left-0 top-0 mb-0 flex h-full w-full items-center justify-center p-4 text-[8.5rem]  opacity-20 grayscale">
        <Emoji className="inline-block h-full align-middle">
          {rule['icônes']}
        </Emoji>
      </div>

      <h2 className="z-10 mb-0 text-base text-white">
        {<Markdown>{summary}</Markdown>}
      </h2>
    </Card>
  )
}
