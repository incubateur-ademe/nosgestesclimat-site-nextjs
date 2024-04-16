'use client'

import Link from '@/components/Link'
import { useRules } from '@/hooks/useRules'

export default function ModeleStatsBlock() {
  const { data: rules } = useRules({
    isOptim: false,
  })

  if (!rules) return <p>Chargement du modèle...</p>

  const numberOfRules = Object.keys(rules).length
  const numberOfQuestions = Object.values(rules).filter(
    (el) => el && el.question
  ).length

  const NumberOfRules = () => <span>{numberOfRules}</span>
  const NumberOfQuestions = () => <span>{numberOfQuestions}</span>

  return (
    <div>
      <p>
        <NGCTrans i18nKey={'model.stats'}>
          Le modèle comprend aujourd'hui <NumberOfRules /> règles de calcul.
          Parmi elles, <NumberOfQuestions /> règles sont des questions à poser à
          l'utilisateur pour calculer un résultat précis.
        </NGCTrans>
      </p>
      <p>
        <NGCTrans i18nKey={'model.questions'}>
          Découvrez{' '}
          <Link href="/questions">
            la liste des questions disponibles dans le modèle
          </Link>
          .
        </NGCTrans>
      </p>
    </div>
  )
}
