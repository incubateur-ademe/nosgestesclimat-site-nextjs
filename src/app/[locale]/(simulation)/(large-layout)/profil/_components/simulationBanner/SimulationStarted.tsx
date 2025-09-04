'use client'

import Link from '@/components/Link'
import PlaySignIcon from '@/components/icons/PlaySignIcon'
import RestartIcon from '@/components/icons/RestartIcon'
import Trans from '@/components/translation/trans/TransClient'
import {
  profilClickCtaReprendre,
  profilClickCtaResultats,
  profilClickRecommencer,
} from '@/constants/tracking/pages/profil'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  useActions,
  useCurrentSimulation,
  useFormState,
} from '@/publicodes-state'
import TutorialLink from './_components/TutorialLink'

export default function SimulationStarted() {
  const { t } = useClientTranslation()

  const { getLinkToEndPage } = useEndPage()

  const { relevantAnsweredQuestions } = useFormState()

  const { progression } = useCurrentSimulation()

  const { chosenActions, declinedActions } = useActions()

  const { goToSimulateurPage, getLinkToSimulateurPage } = useSimulateurPage()

  const isFinished = progression === 1

  return (
    <div className="flex flex-1 flex-wrap">
      <div className="sm:mt-4 sm:w-[30rem]">
        <Card className="mr-8 border-none bg-gray-100">
          <p>
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
            <summary
              className="mb-2 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-expanded="false"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  const details = e.currentTarget
                    .parentElement as HTMLDetailsElement
                  details.open = !details.open
                }
              }}>
              Où sont mes données ?{' '}
              <span className="sr-only">
                Cliquez pour afficher les informations sur la localisation des
                données
              </span>
            </summary>
            <span className="text-xs!">
              Vos données sont stockées dans votre navigateur, vous avez donc le
              contrôle total sur elles.
            </span>
          </Trans>{' '}
          <Link href="/vie-privee" className="text-xs!">
            <Trans>En savoir plus</Trans>
          </Link>
        </details>
      </div>

      <ul className="my-4 flex flex-col items-start md:w-auto">
        {isFinished && (
          <li>
            <ButtonLink
              className="w-full justify-center text-center leading-8"
              color="primary"
              href={getLinkToEndPage()}
              trackingEvent={profilClickCtaResultats}>
              <Trans>Voir mon résultat</Trans>
            </ButtonLink>
          </li>
        )}

        {!isFinished && (
          <li>
            <ButtonLink
              color="primary"
              className="w-full justify-center!"
              href={getLinkToSimulateur()}
              trackingEvent={profilClickCtaReprendre}>
              <PlaySignIcon className="mr-2 fill-white" />

              <Trans>Reprendre mon test</Trans>
            </ButtonLink>
          </li>
        )}

        <li>
          <ButtonLink
            color="secondary"
            className="my-2 w-full text-center"
            trackingEvent={profilClickRecommencer}
            onClick={() => {
              goToSimulateurPage({ noNavigation: true, newSimulation: {} })
            }}
            href={getLinkToSimulateurPage({ newSimulation: true })}>
            <RestartIcon className="fill-primary-700 mr-2" />

            <Trans>Recommencer</Trans>
          </ButtonLink>
        </li>

        <li>
          <TutorialLink />
        </li>
      </ul>
    </div>
  )
}
