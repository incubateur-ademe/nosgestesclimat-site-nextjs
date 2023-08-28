'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { useForm } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import TutorialLink from './TutorialLink'

export default function HasSimulationBanner() {
  const { progression, remainingQuestions, relevantQuestions } = useForm()

  const router = useRouter()

  const percentFinished = Math.round(progression * 100)

  const answeredQuestionsLength =
    relevantQuestions.length - remainingQuestions.length

  const isSimulationInProgress = progression > 0 && progression < 1
  if (progression === 0) return null

  console.log('TODO : implement actions selected system')
  const actionChoicesLength = 0

  return (
    <div className="flex items-start flex-wrap">
      <div className="w-[30rem] mt-4">
        <Card className="mr-8 flex-col">
          <p className="text-lg">
            <TransClient i18nKey={'publicodes.Profil.recap'}>
              Vous avez terminé le test à{' '}
              {{ percentFinished } as unknown as ReactNode} % (
              {{ answeredQuestionsLength } as unknown as ReactNode} questions)
              et choisi {{ actionChoicesLength } as unknown as ReactNode}{' '}
              actions.
            </TransClient>{' '}
          </p>
        </Card>
        <details className="mt-3 max-w-full text-sm">
          <TransClient i18nKey={'publicodes.Profil.locationDonnées'}>
            <summary className="mb-2 cursor-pointer">
              Où sont mes données ?{' '}
            </summary>
            <span className="!text-xs">
              Vos données sont stockées dans votre navigateur, vous avez donc le
              contrôle total sur elles.
            </span>
          </TransClient>

          <Link href="/vie-privee">
            <TransClient>En savoir plus</TransClient>
          </Link>
        </details>
      </div>

      <div className="flex flex-col my-4">
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
  )
}
