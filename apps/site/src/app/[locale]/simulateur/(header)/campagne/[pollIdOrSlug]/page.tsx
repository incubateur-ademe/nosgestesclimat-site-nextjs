import Trans from '@/components/translation/trans/TransServer'
import { SIMULATOR_PATH } from '@/constants/urls/paths'

import Emoji from '@/design-system/utils/Emoji'
import type { Simulation } from '@/helpers/server/model/simulations'
import { getSimulationMode } from '@/helpers/server/model/simulations'
import type { Locale } from '@/i18nConfig'
import { getUserSession } from '@/services/auth/get-user-session'
import { createPollSimulation } from '@/services/organisations/create-poll-simulation'
import { getPoll as baseGetPoll } from '@/services/polls/get-poll'
import { getLastCompletedSimulation } from '@/services/simulations/get-last-completed-simulation'
import { resolveNewSimulationModel } from '@/services/simulations/resolve-new-simulation-model'
import { toSimulationDto } from '@/services/simulations/simulation.dto'
import { migrateSimulationIfNeeded } from '@nosgestesclimat/core/features/simulations/helpers/migrate-simulation'
import { findLatestPollSimulation } from '@nosgestesclimat/core/features/simulations/repository/simulation.repository'
import { notFound, redirect } from 'next/navigation'
import { PollTracker } from '../../../../../../components/tracking/PollTracker'
import PollTutorialButton from '../../_components/PollTutorialButton'
import ReuseSimulationForPoll from '../../_components/ReuseSimulationForPoll'
import Tutorial from '../../_components/Tutorial'
import YouthTutorial from '../../_components/YouthTutorial'

export default async function CampagnePage({
  params,
  searchParams,
}: PageProps<'/[locale]/simulateur/campagne/[pollIdOrSlug]'>) {
  const { pollIdOrSlug, locale } = (await params) as {
    pollIdOrSlug: string
    locale: Locale
  }

  const poll = await getPoll(pollIdOrSlug)

  const [lastCompletedSimulation, currentPollSimulation] = await Promise.all([
    getLastCompletedSimulation(),
    getCurrentPollSimulation({ pollId: poll.id }),
  ])

  if (currentPollSimulation && currentPollSimulation.progression < 1) {
    redirect(SIMULATOR_PATH)
  }

  async function createNewSimulation() {
    'use server'
    await createPollSimulation({
      poll,
      locale,
      model: await resolveNewSimulationModel({
        searchParams: await searchParams,
        locale,
        mode: poll.mode,
      }),
    })
    redirect(SIMULATOR_PATH)
  }

  async function reuseSimulation() {
    'use server'
    if (!lastCompletedSimulation) return
    await createPollSimulation({
      poll,
      simulation: lastCompletedSimulation,
      locale,
    })
    redirect(SIMULATOR_PATH)
  }

  // A completed simulation is only offered for reuse when :
  // - the previous completed simulation has "mode" === "standard"
  // - the newer simulation also has "mode" === "standard"
  const allowToReuseExistingSimulation =
    !!lastCompletedSimulation &&
    poll.mode === 'standard' &&
    getSimulationMode(lastCompletedSimulation) === 'standard' &&
    !currentPollSimulation &&
    // eslint-disable-next-line react-hooks/purity
    Date.now() - new Date(lastCompletedSimulation.date as string).getTime() <
      6 * 30 * 24 * 3600 * 1000

  const disclaimer = (
    <div className="relative pl-8">
      <Emoji className="absolute left-0">🏢</Emoji>
      <p>
        <Trans locale={locale}>Ce test vous est proposé par</Trans>{' '}
        <strong>{poll.organisation.name}</strong>.{' '}
        <Trans locale={locale}>
          En participant vous acceptez que vos résultats soient partagés
          anonymement avec cette organisation.
        </Trans>
      </p>
    </div>
  )

  if (allowToReuseExistingSimulation) {
    return (
      <ReuseSimulationForPoll
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        createNewSimulation={createNewSimulation}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        reuseSimulation={reuseSimulation}
        locale={locale}
        disclaimer={disclaimer}
        simulation={lastCompletedSimulation}
      />
    )
  }
  const buttonNext = (
    <PollTutorialButton
      poll={poll}
      hasCompletedPollSimulation={currentPollSimulation?.progression === 1}
      locale={locale}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      createSimulation={createNewSimulation}
    />
  )
  return (
    <>
      <PollTracker poll={poll} />

      {poll.mode === 'scolaire' ? (
        <YouthTutorial locale={locale} buttonNext={buttonNext} />
      ) : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      poll.mode === 'standard' ? (
        <Tutorial
          locale={locale}
          disclaimer={disclaimer}
          buttonNext={buttonNext}
        />
      ) : (
        (poll.mode satisfies never)
      )}
    </>
  )
}

async function getPoll(...args: Parameters<typeof baseGetPoll>) {
  const poll = await baseGetPoll(...args)
  if (!poll) notFound()
  return poll
}

async function getCurrentPollSimulation({
  pollId,
}: {
  pollId: string
}): Promise<Simulation | undefined> {
  const session = await getUserSession()
  if (!session) return undefined

  const simulation = await findLatestPollSimulation({
    userId: session.id,
    pollId,
  })
  if (!simulation) return undefined

  return toSimulationDto(migrateSimulationIfNeeded(simulation))
}
