import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { AnswerType } from '@/types/quiz'

type Props = {
  choices: DottedName[]
  isAnswerCorrect: AnswerType
  isAnswerValidated: boolean
}

export default function Label({
  choices,
  isAnswerCorrect,
  isAnswerValidated,
}: Props) {
  const { t } = useClientTranslation()

  const { linkToEndPage } = useEndPage()

  const { title, numericValue } = useRule(choices[0])

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  // If the answer is not yet validated, we display the question
  if (!isAnswerValidated) {
    return (
      <Title>
        Une devinette pour finir ! D’après vous, quel est{' '}
        <span className="text-secondary">votre</span> poste le plus important ?
      </Title>
    )
  }

  // If the answer is right, we display a congratulation message
  if (isAnswerCorrect === 'correct') {
    return (
      <div className="bg-primary-500 text-white">
        <h1>{t('Bien vu\u202f!')}&nbsp;👌</h1>
        <Trans>Effectivement, avec</Trans> {formattedValue}{' '}
        <Trans>{unit}</Trans>, {title}
        {t('est votre poste le plus important\u202f!')}{' '}
        <Link href={linkToEndPage}>
          <Trans>Découvrez vos résultats détaillés</Trans>
        </Link>
      </div>
    )
  }

  // If the answer is almost right, we display a less congratulating message
  if (isAnswerCorrect === 'almost') {
    return (
      <div className="bg-primary-500 text-white">
        <h1>{t('Presque\u202f!')}&nbsp;🙃</h1>
        <Trans>Avec</Trans> {formattedValue} <Trans>{unit}</Trans>, {title}
        {t('est votre poste le plus important\u202f!')}{' '}
        <Link href={linkToEndPage}>
          <Trans>Découvrez vos résultats détaillés</Trans>
        </Link>
      </div>
    )
  }

  // Else, the answer is wrong and we display a message to inform the user
  return (
    <div className="bg-primary-500 text-white">
      <h1>{t('Loupé\u202f!')}&nbsp;😓</h1>
      <Trans>Avec</Trans> {formattedValue} <Trans>{unit}</Trans>, {title}
      {t('est votre poste le plus important\u202f!')}{' '}
      <Link href={linkToEndPage}>
        <Trans>Découvrez vos résultats détaillés</Trans>
      </Link>
    </div>
  )
}
