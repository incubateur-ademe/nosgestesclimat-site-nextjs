'use client'

import Markdown from 'markdown-to-jsx'
import { utils } from 'publicodes'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../../tailwind.config'

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import { useRule } from '@/publicodes-state'

export default function DocumentationLandingCard({ edito }: { edito: string }) {
  const { color, icons, resume } = useRule(edito)
  const twConfig = resolveConfig(tailwindConfig) as Record<string, any>
  const defaultColor = twConfig?.theme?.colors?.primary['500']

  return (
    <Card
      tag={Link}
      style={{ backgroundColor: color || defaultColor }}
      href={'/documentation/' + utils.encodeRuleName(edito)}
      className="relative !flex h-[12rem] flex-auto justify-center text-center text-base text-white no-underline">
      <p className="-z-1 absolute bottom-0 left-0 right-0 top-0 text-center align-middle text-[8.5rem] opacity-20 grayscale">
        {icons}
      </p>
      <h2 className="z-10 mb-0 text-base text-white">
        {<Markdown>{resume || '...'}</Markdown>}
      </h2>
    </Card>
  )
}
