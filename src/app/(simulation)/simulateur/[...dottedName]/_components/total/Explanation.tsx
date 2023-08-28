import Link from 'next/link'

import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import { useForm } from '@/publicodes-state'

type Props = { setIsOpen: Function }

export default function Explanation({ setIsOpen }: Props) {
  const { progression } = useForm()
  return (
    <div className="border-4 border-primary mb-2 rounded-lg p-4 pt-2">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen((previsOpen: boolean) => !previsOpen)}
          className="text-3xl leading-none">
          ×
        </button>
      </div>
      {progression === 0 ? (
        <p className="mb-4">
          <TransClient i18nKey={'components.ScoreExplanation.text.p1'}>
            🧮 Voici votre score de départ, calculé à partir de réponses
            attribuées à l'avance à chaque question ! Il évoluera à chaque
            nouvelle réponse.
          </TransClient>
        </p>
      ) : (
        <p className="mb-4">
          <TransClient i18nKey={'components.ScoreExplanation.text.p2'}>
            🧮 Voici votre score provisoire, il évolue à chaque nouvelle réponse
            !
          </TransClient>
        </p>
      )}
      <p className="mb-4">
        <TransClient i18nKey={'components.ScoreExplanation.text.p3'}>
          🤔 Si vous répondez "je ne sais pas" à une question, le score ne
          changera pas : une valeur par défaut vous est attribuée.
        </TransClient>
      </p>
      <p className="mb-4">
        <TransClient i18nKey={'components.ScoreExplanation.text.p4'}>
          💡 Nous améliorons le calcul et ses valeurs par défaut{' '}
          <Link href="/nouveautés">tous les mois</Link>!
        </TransClient>
      </p>
      <div className="flex justify-end">
        <Button onClick={() => setIsOpen((previsOpen: boolean) => !previsOpen)}>
          J'ai compris
        </Button>
      </div>
    </div>
  )
}
