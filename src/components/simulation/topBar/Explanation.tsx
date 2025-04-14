'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { simulateurCloseScoreInfo } from '@/constants/tracking/pages/simulateur'
import { TUTORIALS } from '@/constants/tutorial'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Explanation() {
  const { progression } = useCurrentSimulation()
  const { tutorials, hideTutorial } = useUser()

  const { t } = useClientTranslation()

  const isFirstToggle = tutorials.scoreExplanation === undefined

  const [shouldShowExplanation, setShouldShowExplanation] = useState(false)

  function closeExplanation() {
    trackEvent(simulateurCloseScoreInfo)
    hideTutorial(TUTORIALS.SCORE_EXPLANATION)
    setShouldShowExplanation(false)
  }

  useEffect(() => {
    if (progression > 0.05 && !tutorials.scoreExplanation && isFirstToggle) {
      hideTutorial(TUTORIALS.SCORE_EXPLANATION)
      setShouldShowExplanation(false)
    }
  }, [hideTutorial, progression, tutorials.scoreExplanation, isFirstToggle])

  useEffect(() => {
    if (isFirstToggle) {
      const timer = setTimeout(() => {
        setShouldShowExplanation(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isFirstToggle])

  if (
    shouldShowExplanation ||
    (!tutorials.scoreExplanation && !isFirstToggle)
  ) {
    return (
      <motion.div
        initial={{ opacity: 0, translateY: '-10px' }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.3 }}
        className="border-primary-200 absolute top-20 right-0 left-0 z-50 mb-2 w-full rounded-xl border-2 bg-gray-100 p-3 pt-2 text-sm md:top-24 md:left-0 md:mx-0 lg:w-80">
        <svg
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-6 left-4 z-10">
          <path
            d="M14 0L27.8564 24H0.143594L14 0Z"
            className="stroke-primary-200 fill-gray-100 stroke-2"
          />
        </svg>

        <div className="mb-1 flex justify-end">
          <button
            onClick={closeExplanation}
            className="h-3 w-3 bg-gray-100 text-xl leading-none"
            title={t('Fermer')}>
            ×
          </button>
        </div>

        {progression === 0 ? (
          <p className="mb-2">
            <Emoji>🧮</Emoji>{' '}
            <Trans i18nKey={'components.ScoreExplanation.text.p1'}>
              Voici vos scores de départ, calculés à partir de réponses
              attribuées à l'avance à chaque question ! Ils évolueront à chaque
              nouvelle réponse.
            </Trans>
          </p>
        ) : (
          <p className="mb-2">
            <Emoji>🧮</Emoji>{' '}
            <Trans i18nKey={'components.ScoreExplanation.text.p2'}>
              Voici vos scores provisoires, ils évoluent à chaque nouvelle
              réponse !
            </Trans>
          </p>
        )}
        <p className="mb-2">
          <Emoji>🤔</Emoji>{' '}
          <Trans i18nKey={'components.ScoreExplanation.text.p3'}>
            Si vous répondez "je ne sais pas" à une question, le score ne
            changera pas : une valeur par défaut vous est attribuée.
          </Trans>
        </p>
        <p className="mb-2">
          <Emoji>💡</Emoji>{' '}
          <Trans i18nKey={'components.ScoreExplanation.text.p4'}>
            Nous améliorons le calcul et ses valeurs par défaut{' '}
            <Link href="/nouveautes">tous les mois</Link>!
          </Trans>
        </p>
        <p className="mb-2 md:mb-4">
          <Emoji>💧</Emoji>{' '}
          <Trans>
            Retrouvez aussi le résultat de votre empreinte eau à la fin du
            test !
          </Trans>
        </p>
        <div className="flex justify-end">
          <Button
            size="xs"
            data-cypress-id="understood-explanation-button"
            onClick={closeExplanation}>
            <Trans>J'ai compris</Trans>
          </Button>
        </div>
      </motion.div>
    )
  }

  return null
}
