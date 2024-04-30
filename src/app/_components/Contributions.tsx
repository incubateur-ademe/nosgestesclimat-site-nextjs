'use client'

import Link from '@/components/Link'
import GlassesIcon from '@/components/icons/GlassesIcon'
import PencilIcon from '@/components/icons/PencilIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import Trans from '@/components/translation/Trans'
import {
  homeClickCodeSource,
  homeClickContribution,
  homeClickDocumentation,
} from '@/constants/tracking/pages/home'
import Card from '@/design-system/layout/Card'
import Kicker from '@/design-system/layout/Kicker'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import Background from './organisations/Background'

export default function Contributions() {
  const { t } = useClientTranslation()

  const [isHover, setIsHover] = useState(false)
  return (
    <div className="relative mb-16 py-12 md:py-24">
      <Background direction={isHover ? 'right' : 'left'} withColorLine />
      <div className="relative mx-auto w-full max-w-5xl px-4 md:px-8">
        <Kicker>
          <Trans>Ouvert, documenté et contributif</Trans>
        </Kicker>
        <h2 className="mb-8 font-medium md:text-3xl">
          <Trans>Apportez votre pierre au simulateur de référence</Trans>
        </h2>
        <div className="flex flex-col gap-4 md:flex-row md:gap-7">
          <Card
            tag={Link}
            href="/nouveautes"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => trackEvent(homeClickCodeSource)}
            className="min-h-48 flex-1 flex-col items-center gap-4 rounded-xl border-2 border-alimentation-400 py-8 text-inherit no-underline transition-colors hover:border-alimentation-600 hover:text-default"
            data-cypress-id="nouveautes-link">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-alimentation-100">
              <SearchIcon
                className="inline-block fill-alimentation-700"
                width="20"
                height="20"
              />
            </div>

            <p className="mb-0 text-center">
              <Trans>Le</Trans>{' '}
              <span className="text-alimentation-800 underline">
                <Trans>code source est ouvert</Trans>
              </span>
              , <Trans>le site est amélioré régulièrement.</Trans>
            </p>
          </Card>

          <Card
            tag={Link}
            href="/documentation"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => trackEvent(homeClickDocumentation)}
            className="min-h-48 flex-1 flex-col items-center gap-4 rounded-xl border-2 border-divers-300 py-8 text-inherit no-underline transition-colors hover:border-divers-500 hover:text-default"
            data-cypress-id="documentation-link">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-divers-100">
              <GlassesIcon
                className="inline-block fill-divers-700"
                width="20"
                height="20"
              />
            </div>

            <p className="mb-0 text-center">
              <Trans>L'intégralité du</Trans>{' '}
              <span className="text-divers-800 underline">
                <Trans>calcul est documenté en ligne</Trans>
              </span>{' '}
              <Trans>pour les curieux et les experts.</Trans>
            </p>
          </Card>

          <Card
            tag={Link}
            href="/contact"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => trackEvent(homeClickContribution)}
            className="min-h-48 flex-1 flex-col items-center gap-4 rounded-xl border-2 border-logement-400 py-8 text-inherit no-underline transition-colors hover:border-logement-600 hover:text-default"
            data-cypress-id="contact-link">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-logement-100">
              <PencilIcon
                className="inline-block stroke-logement-700"
                width="20"
                height="20"
              />
            </div>

            <p className="mb-0 text-center">
              {t('Une idée\u202f? Une correction\u202f? Une remarque\u202f?')}{' '}
              <span className="text-logement-800 underline">
                {t('Toute contribution est la bienvenue\u202f!')}
              </span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
