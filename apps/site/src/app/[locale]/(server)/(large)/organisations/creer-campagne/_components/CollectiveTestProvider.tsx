'use client'

import {
  COLLECTIVE_TEST_CONNEXION_PATH,
  COLLECTIVE_TEST_FINALISER_PATH,
  COLLECTIVE_TEST_INFORMATIONS_PATH,
  COLLECTIVE_TEST_INSCRIPTION_PATH,
  COLLECTIVE_TEST_MODE_PATH,
  COLLECTIVE_TEST_ORGANISATION_PATH,
} from '@/constants/urls/paths'
import {
  collectiveTestReducer,
  currentCollectiveTestStep,
  getCollectiveTestStepNumber,
  getCollectiveTestTotalSteps,
  type CollectiveTestEvent,
  type CollectiveTestState,
  type CollectiveTestStep,
} from '@/helpers/organisations/collectiveTestMachine'
import { useLocale } from '@/hooks/useLocale'
import { submitCollectiveTest } from '@/services/organisations/submit-collective-test'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react'
import { getCollectiveTestFlowStatus } from '../_actions/getCollectiveTestFlowStatus'
import {
  clearCollectiveTestDrafts,
  readCollectiveTestDrafts,
  writeCollectiveTestDrafts,
} from '../_services/collectiveTestStorage'

const STEP_TO_PATHS: Record<CollectiveTestStep, string[]> = {
  informations: [COLLECTIVE_TEST_INFORMATIONS_PATH],
  mode: [COLLECTIVE_TEST_MODE_PATH],
  authentification: [
    COLLECTIVE_TEST_CONNEXION_PATH,
    COLLECTIVE_TEST_INSCRIPTION_PATH,
  ],
  organisation: [COLLECTIVE_TEST_ORGANISATION_PATH],
  finaliser: [COLLECTIVE_TEST_FINALISER_PATH],
  done: [],
}

export interface CollectiveTestContextValue {
  state: CollectiveTestState
  currentStep: CollectiveTestStep
  stepNumber: number
  totalSteps: number
  send: Dispatch<CollectiveTestEvent>
}

const CollectiveTestContext = createContext<CollectiveTestContextValue | null>(
  null
)

export function useCollectiveTestFlow(): CollectiveTestContextValue {
  const ctx = useContext(CollectiveTestContext)

  if (!ctx) {
    throw new Error(
      'useCollectiveTestFlow must be used within <CollectiveTestProvider>'
    )
  }

  return ctx
}

interface CollectiveTestProviderProps {
  children: ReactNode
  initialState: CollectiveTestState
}

export function CollectiveTestProvider({
  children,
  initialState,
}: CollectiveTestProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const [state, send] = useReducer(collectiveTestReducer, initialState)
  const [isHydrated, setIsHydrated] = useState(false)

  const currentStep = currentCollectiveTestStep(state)
  const stepNumber = getCollectiveTestStepNumber(currentStep, state)
  const totalSteps = getCollectiveTestTotalSteps(state)

  // Keep the latest drafts available to the submission effect without
  // re-running it on every draft keystroke.
  const draftsRef = useRef({ pollDraft: state.pollDraft, orgaDraft: state.orgaDraft })
  useEffect(() => {
    draftsRef.current = { pollDraft: state.pollDraft, orgaDraft: state.orgaDraft }
  })

  // hydration: restore the persisted drafts once, before any navigation
  useEffect(() => {
    const drafts = readCollectiveTestDrafts()

    send({
      type: 'HYDRATE',
      pollDraft: drafts.pollDraft,
      orgaDraft: drafts.orgaDraft,
    })
    setIsHydrated(true)
  }, [])

  // persistence: write the drafts on every change, clear them on success
  useEffect(() => {
    if (!isHydrated) return

    if (state.submission.status === 'success') {
      clearCollectiveTestDrafts()
      return
    }

    writeCollectiveTestDrafts({
      pollDraft: state.pollDraft,
      orgaDraft: state.orgaDraft,
    })
  }, [state, isHydrated])

  // revalidate the organisation right after the user authenticates
  useEffect(() => {
    if (!state.isAuth || state.currentOrga.status !== 'loading') return

    let cancelled = false

    void getCollectiveTestFlowStatus().then(
      ({ hasOrg, orgSlug, orgName }) => {
        if (!cancelled) {
          send({ type: 'ORG_STATUS_FETCHED', hasOrg, orgSlug, orgName })
        }
      }
    )

    return () => {
      cancelled = true
    }
  }, [state.isAuth, state.currentOrga.status])

  // navigation: the current step is derived, the effect only follows it
  useEffect(() => {
    if (!isHydrated) return

    if (currentStep === 'done') {
      const { orgSlug, pollSlug } = state.submission

      if (orgSlug && pollSlug) {
        router.replace(`/organisations/${orgSlug}/campagnes/${pollSlug}`)
        router.refresh()
      }
      return
    }

    const validPaths = STEP_TO_PATHS[currentStep]

    if (!validPaths.includes(pathname)) {
      router.push(validPaths[0])
    }
  }, [currentStep, pathname, isHydrated, state.submission, router])

  // submission: call the atomic server action once the flow is pending
  useEffect(() => {
    if (state.submission.status !== 'pending') return

    let cancelled = false

    void (async () => {
      const { pollDraft, orgaDraft } = draftsRef.current

      const result = await submitCollectiveTest({
        pollDraft: {
          name: pollDraft.name ?? '',
          mode: pollDraft.mode ?? 'standard',
          expectedNumberOfParticipants:
            pollDraft.expectedNumberOfParticipants ?? undefined,
        },
        orgaDraft: orgaDraft ?? null,
        locale,
      })

      if (cancelled) return

      if (result.success) {
        send({
          type: 'SUBMISSION_SUCCEEDED',
          pollId: result.data.pollId,
          pollSlug: result.data.pollSlug,
          orgSlug: result.data.orgSlug,
        })
      } else {
        send({ type: 'SUBMISSION_FAILED', reason: result.error })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [state.submission.status, locale])

  return (
    <CollectiveTestContext.Provider
      value={{ state, currentStep, stepNumber, totalSteps, send }}>
      {children}
    </CollectiveTestContext.Provider>
  )
}
