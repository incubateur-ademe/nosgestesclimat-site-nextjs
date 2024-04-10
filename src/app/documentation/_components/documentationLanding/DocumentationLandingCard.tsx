'use client'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useEngine } from '@/publicodes-state'
import { DottedName, NGCRule } from '@/publicodes-state/types'
import Markdown from 'markdown-to-jsx'
import { utils } from 'publicodes'

type Props = {
  dottedName: DottedName
  summary: string
  rule: NGCRule
}

export default function DocumentationLandingCard({
  dottedName,
  summary,
  rule,
}: Props) {
  const { getCategory } = useEngine()
  const category = getCategory(dottedName)

  return (
    <Card
      tag={Link}
      href={'/documentation/' + utils.encodeRuleName(dottedName)}
      className={`relative h-[12rem] flex-auto justify-center rounded-lg border-2 text-center text-base shadow-none ${getBorderColor(category)} ${getTextDarkColor(category)} no-underline ${getBackgroundLightColor(
        category
      )}`}>
      <div className="-z-1 absolute left-0 top-0 mb-0 flex h-full w-full items-center justify-center p-4 text-[8.5rem]  opacity-20 grayscale">
        <Emoji className="inline-block h-full align-middle">
          {rule['icônes']}
        </Emoji>
      </div>

      <h2 className="z-10 mb-0 text-base ">{<Markdown>{summary}</Markdown>}</h2>
    </Card>
  )
}
