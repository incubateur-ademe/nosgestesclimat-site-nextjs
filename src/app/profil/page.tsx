'use client'

import Link from '@/components/Link'

import TransClient from '@/components/translation/TransClient'

import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useForm, useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'
import { useRouter } from 'next/navigation'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { ReactNode } from 'react'
import TutorialLink from './_components/TutorialLink'
import AnswerList from './_components/answerList/AnswerList'
/*
export const metadata: Metadata = {
  title: 'Mon profil',
  description:
    'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.',
}
*/

export default function Profil() {
  const router = useRouter()

  const { simulations, currentSimulation: currentSimulationId } = useUser()

  const currentSimulation = simulations.find(
    (simulation: Simulation) => simulation.id === currentSimulationId
  )
  const { persona, answered } = currentSimulation || {}

  const { progression, remainingQuestions, relevantQuestions } = useForm()

  const percentFinished = Math.round(progression * 100)

  const answeredQuestionsLength =
    relevantQuestions.length - remainingQuestions.length

  const isSimulationInProgress = progression > 0 && progression < 1

  console.log('TODO : implement actions selected system')
  const actionChoicesLength = 0

  return (
    <>
      <Title title={<TransClient>Mon profil</TransClient>} />

      {persona && (
        <p>
          <em>
            <TransClient>👤 Vous utilisez actuellement le persona</TransClient>{' '}
            <code>{persona.nom}</code>
          </em>
        </p>
      )}

      {progression === 0 && (
        <Card className="!w-[35rem] max-w-full p-8 mt-4 flex-col flex items-start gap-2 !shadow-none">
          <p>
            <span
              role="img"
              aria-label="hole emoji"
              className="text-3xl inline-block mr-4">
              🕳️
            </span>
            <TransClient>Vous n'avez pas encore fait le test.</TransClient>
          </p>
          <div className="flex flex-wrap items-center gap-4 w-full">
            <ButtonLink href="/simulateur/bilan">
              <ProgressCircle className="mr-2" white />
              <TransClient>Commencer le test</TransClient>
            </ButtonLink>
            <TutorialLink />
          </div>
        </Card>
      )}

      {progression > 0 && (
        <div className="flex items-start flex-wrap">
          <div className="w-[30rem]">
            <Card className="mr-8 flex-col">
              <p className="text-lg">
                <TransClient i18nKey={'publicodes.Profil.recap'}>
                  Vous avez terminé le test à{' '}
                  {{ percentFinished } as unknown as ReactNode} % (
                  {{ answeredQuestionsLength } as unknown as ReactNode}{' '}
                  questions) et choisi{' '}
                  {{ actionChoicesLength } as unknown as ReactNode} actions.
                </TransClient>{' '}
              </p>
            </Card>
            <details className="mt-3 max-w-full text-sm">
              <TransClient i18nKey={'publicodes.Profil.locationDonnées'}>
                <summary className="mb-2">Où sont mes données ? </summary>
                <span className="!text-xs">
                  Vos données sont stockées dans votre navigateur, vous avez
                  donc le contrôle total sur elles.
                </span>
              </TransClient>
              <Link href="/vie-privee">
                <TransClient>En savoir plus</TransClient>
              </Link>
            </details>
          </div>

          <div className="flex flex-col">
            {isSimulationInProgress && (
              <ButtonLink color="primary" href="/simulateur/bilan">
                <TransClient>
                  <ProgressCircle white className="mr-2" /> Finir mon test
                </TransClient>
              </ButtonLink>
            )}
            <Button
              color="secondary"
              className="my-2 !text-base"
              onClick={() => {
                router.push('/simulateur/bilan')
              }}>
              <span
                role="img"
                aria-label="recycle emoji"
                className="text-xl inline-block mr-2">
                ♻️
              </span>{' '}
              <TransClient>Recommencer</TransClient>
            </Button>
            <TutorialLink className="!text-base font-normal" />
          </div>
        </div>
      )}

      {/* <Localisation /> */}

      <AnswerList />

      {/*simulations && (
          <div className="mt-8">
            <h2>
              💾 <Trans>Mon historique des simulations</Trans>
            </h2>
            <p>
              <Trans i18nKey={'publicodes.Profil.simulations'}>
                Chaque simulation que vous faite est sauvegardée dans votre
                navigateur Web. Vous êtes le seul à y avoir accès.
              </Trans>
            </p>
            <SimulationList
              {...{ dispatch, list: simulationList, currentSimulationId }}
            />
          </div>
        )*/}
    </>
  )
}
