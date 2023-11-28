'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Kicker from '@/design-system/layout/Kicker'
import Emoji from '@/design-system/utils/Emoji'
import { useState } from 'react'
import Background from './organisations/Background'

export default function Contributions() {
  const [isHover, setIsHover] = useState(false)
  return (
    <div className="relative mb-16 py-12 md:py-24">
      <Background direction={isHover ? 'right' : 'left'} />
      <div className="relative mx-auto w-full max-w-5xl px-4">
        <Kicker>
          <Trans>Ouvert, documenté et contributif</Trans>
        </Kicker>
        <h2 className="mb-8 font-medium md:text-3xl">
          <Trans>Apportez votre pierre au simulateur de référence</Trans>
        </h2>
        <div className="flex flex-col gap-4 md:flex-row md:gap-7">
          <Card
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="flex-1 flex-row items-center gap-4 py-8 md:flex-col">
            <Emoji className="text-3xl">🔍</Emoji>
            <p className="mb-0">
              <Trans>
                Le code source est ouvert, le site est{' '}
                <Link href="/nouveautes">amélioré régulièrement</Link>.
              </Trans>
            </p>
          </Card>
          <Card
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="flex-1 flex-row items-center gap-4 py-8 md:flex-col">
            <Emoji className="text-3xl">👀</Emoji>
            <p className="mb-0">
              <Trans>
                L'intégralité du calcul est{' '}
                <Link href="/documentation">documenté</Link> en ligne pour les
                curieux et les experts.
              </Trans>
            </p>
          </Card>
          <Card
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="flex-1 flex-row items-center gap-4 py-8 md:flex-col">
            <Emoji className="text-3xl">🖋️</Emoji>
            <p className="mb-0">
              <Trans>
                Une idée&#8239;? Une correction&#8239;? Une remarque&#8239;?
                Toute contribution{' '}
                <Link href="/contact">est la bienvenue&#8239;!</Link>
              </Trans>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
