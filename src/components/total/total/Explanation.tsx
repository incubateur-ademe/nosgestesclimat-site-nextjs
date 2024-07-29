'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation } from '@/publicodes-state'
import { motion } from 'framer-motion'

type Props = { toggleOpen: any }

export default function Explanation({ toggleOpen }: Props) {
  const { progression } = useCurrentSimulation()

  const { t } = useClientTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className="absolute -top-8 z-50 mb-2 w-full origin-top-left rounded-xl border-2 border-primary-200 bg-gray-100 p-4 px-4 py-2 pt-2 lg:w-2/3">
      <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-full left-8">
        <path
          d="M14 0L27.8564 24H0.143594L14 0Z"
          className=" fill-gray-100 stroke-primary-200 stroke-2"
        />
      </svg>
      <div className="flex justify-end">
        <button
          onClick={toggleOpen}
          className="text-3xl leading-none"
          title={t('Fermer')}>
          ×
        </button>
      </div>
      {progression === 0 ? (
        <p className="mb-2">
          <Trans i18nKey={'components.ScoreExplanation.text.p1'}>
            🧮 Voici votre score de départ, calculé à partir de réponses
            attribuées à l'avance à chaque question ! Il évoluera à chaque
            nouvelle réponse.
          </Trans>
        </p>
      ) : (
        <p className="mb-2">
          <Trans i18nKey={'components.ScoreExplanation.text.p2'}>
            🧮 Voici votre score provisoire, il évolue à chaque nouvelle réponse
            !
          </Trans>
        </p>
      )}
      <p className="mb-2">
        <Trans i18nKey={'components.ScoreExplanation.text.p3'}>
          🤔 Si vous répondez "je ne sais pas" à une question, le score ne
          changera pas : une valeur par défaut vous est attribuée.
        </Trans>
      </p>
      <p className="mb-2">
        <Trans i18nKey={'components.ScoreExplanation.text.p4'}>
          💡 Nous améliorons le calcul et ses valeurs par défaut{' '}
          <Link href="/nouveautes">tous les mois</Link>!
        </Trans>
      </p>
      <div className="flex justify-end">
        <Button
          size="sm"
          data-cypress-id="understood-explanation-button"
          onClick={toggleOpen}>
          <Trans>J'ai compris</Trans>
        </Button>
      </div>
    </motion.div>
  )
}
