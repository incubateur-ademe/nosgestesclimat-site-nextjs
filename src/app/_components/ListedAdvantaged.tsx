'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { ReactNode } from 'react'

type Avantage = {
  illustration: string
  icon?: string
  text: ReactNode
}

export default function ListedAdvantages() {
  const advantages: Avantage[] = [
    {
      illustration: '🪟',
      text: (
        <Trans>
          Le code source est ouvert, le site est{' '}
          <Link href="/nouveautes">amélioré régulièrement</Link>.
        </Trans>
      ),
    },
    {
      illustration: '🔎',
      text: (
        <Trans>
          L'intégralité du calcul est{' '}
          <Link href="/documentation">documenté</Link> en ligne pour les curieux
          et les experts.
        </Trans>
      ),
    },
    {
      illustration: '🖋️',
      text: (
        <Trans>
          Une idée ? Une correction ? Une remarque ? Toute contribution{' '}
          <Link href="/contact">est la bienvenue</Link>!
        </Trans>
      ),
    },
  ]

  return (
    <ul className="m-0 flex flex-wrap items-center gap-4 pl-0">
      {advantages.map((advantage) => (
        <Card
          tag="li"
          key={advantage.illustration}
          className="flex h-[14rem] w-full flex-col items-center justify-center gap-4 md:w-[14rem]">
          <span className="text-[200%]">{advantage.illustration}</span>

          <div className="text-center text-base">{advantage.text}</div>
        </Card>
      ))}
    </ul>
  )
}
