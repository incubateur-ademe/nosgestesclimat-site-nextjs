import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useActions, useEngine, useForm, useUser } from '@/publicodes-state'
import TutorialLink from './_components/TutorialLink'

export default function SimulationStarted() {
  const { t } = useClientTranslation()

  const { getValue } = useEngine()

  const { progression, relevantAnsweredQuestions, categories } = useForm()

  const { initSimulation } = useUser()

  const { chosenActions, declinedActions } = useActions()

  const isFinished = progression === 1

  return (
    <div className="flex flex-wrap">
      <div className="sm:mt-4 sm:w-[30rem]">
        <Card className="mr-8">
          <p className="text-base md:text-lg">
            {t('publicodes.Profil.recap', {
              percentFinished: (progression * 100).toFixed(0),
              answeredQuestionsLength: relevantAnsweredQuestions.length,
              chosenActions: chosenActions.length,
              declinedActions: declinedActions.length,
            })}{' '}
          </p>
        </Card>

        <details className="mt-3 max-w-full text-sm">
          <Trans i18nKey={'publicodes.Profil.locationDonnées'}>
            <summary className="mb-2 cursor-pointer">
              Où sont mes données ?{' '}
            </summary>
            <span className="!text-xs">
              Vos données sont stockées dans votre navigateur, vous avez donc le
              contrôle total sur elles.
            </span>
          </Trans>{' '}
          <Link href="/vie-privee" className="!text-xs">
            <Trans>En savoir plus</Trans>
          </Link>
        </details>
      </div>

      <div className="my-4 flex w-full flex-col md:w-auto md:items-start">
        {isFinished && (
          <ButtonLink
            color="primary"
            href={`/fin?${formatResultToDetailParam({
              categories,
              getValue,
            })}`}
            className="w-full">
            <Trans>
              <Emoji className="mr-2">👀</Emoji> Voir mon résultat
            </Trans>
          </ButtonLink>
        )}

        {!isFinished && (
          <ButtonLink
            color="primary"
            href="/simulateur/bilan"
            className="w-full">
            <Trans>
              <ProgressCircle white className="mr-2" /> Reprendre mon test
            </Trans>
          </ButtonLink>
        )}

        <Button
          color="secondary"
          className="my-2 w-full !text-base"
          onClick={() => {
            initSimulation()
          }}>
          <span
            role="img"
            aria-label="recycle emoji"
            className="mr-2 inline-block text-xl">
            ♻️
          </span>{' '}
          <Trans>Recommencer</Trans>
        </Button>

        <TutorialLink className="w-full !text-base font-normal" />
      </div>
    </div>
  )
}
