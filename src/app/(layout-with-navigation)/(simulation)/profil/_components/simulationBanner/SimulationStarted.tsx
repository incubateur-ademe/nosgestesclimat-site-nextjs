import Link from '@/components/Link'
import PlaySignIcon from '@/components/icons/PlaySignIcon'
import RestartIcon from '@/components/icons/RestartIcon'
import Trans from '@/components/translation/Trans'
import {
  profilClickCtaReprendre,
  profilClickCtaResultats,
  profilClickRecommencer,
} from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useActions, useCurrentSimulation, useForm } from '@/publicodes-state'
import TutorialLink from './_components/TutorialLink'

export default function SimulationStarted() {
  const { t } = useClientTranslation()

  const { getLinkToEndPage } = useEndPage()

  const { relevantAnsweredQuestions } = useForm()

  const { progression } = useCurrentSimulation()

  const { chosenActions, declinedActions } = useActions()

  const { goToSimulateurPage, getLinkToSimulateurPage } = useSimulateurPage()

  const isFinished = progression === 1

  return (
    <div className="flex flex-wrap">
      <div className="sm:mt-4 sm:w-[30rem]">
        <Card className="mr-8 border-none bg-gray-100">
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

      <div className="my-4 flex flex-col items-start md:w-auto">
        {isFinished && (
          <ButtonLink
            className="w-full justify-center text-center leading-8"
            color="primary"
            href={getLinkToEndPage()}
            trackingEvent={profilClickCtaResultats}>
            <Trans>Voir mon résultat</Trans>
          </ButtonLink>
        )}

        {!isFinished && (
          <ButtonLink
            color="primary"
            className="w-full !justify-center"
            href={getLinkToSimulateur()}
            trackingEvent={profilClickCtaReprendre}>
            <PlaySignIcon className="mr-2 fill-white" />

            <Trans>Reprendre mon test</Trans>
          </ButtonLink>
        )}

        <ButtonLink
          color="secondary"
          className="my-2 w-full text-center"
          trackingEvent={profilClickRecommencer}
          onClick={() => {
            goToSimulateurPage({ noNavigation: true, newSimulation: {} })
          }}
          href={getLinkToSimulateurPage({ newSimulation: true })}>
          <RestartIcon className="mr-2 fill-primary-700" />

          <Trans>Recommencer</Trans>
        </ButtonLink>

        <TutorialLink />
      </div>
    </div>
  )
}
