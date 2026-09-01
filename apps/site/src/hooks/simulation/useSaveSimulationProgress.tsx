'use client'

import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { getComputedResults } from '@/publicodes-state/helpers/getComputedResults'
import { EngineContext } from '@/publicodes-state/providers/engineProvider/context'
import type { SimulationSituationPayload } from '@/services/simulations/update-simulation-situation'
import { updateSimulationSituation } from '@/services/simulations/update-simulation-situation'
import { captureException, setExtra } from '@sentry/nextjs'
import type { PropsWithChildren } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const SaveSimulationProgressContext = createContext<{
  requestSaveSimulationProgress: () => void
}>({ requestSaveSimulationProgress: () => {} })

/**
 * Everything a progress save writes, minus `progression` and `computedResults`
 * which are derived from it. Compared by content and not by reference: revisiting
 * a skipped question folds it again, and `useUpdateCurrentSimulation` rebuilds
 * `extendedSituation` into a fresh object with identical content.
 */
function getSignature({
  situation,
  extendedSituation,
  foldedSteps,
}: Pick<
  SimulationSituationPayload,
  'situation' | 'extendedSituation' | 'foldedSteps'
>) {
  return JSON.stringify({ situation, extendedSituation, foldedSteps })
}

/**
 * Persists the simulation being answered, on demand. Mounted inside the form so
 * that the "Suivant" button and "Je ne sais pas répondre" share a single view of
 * what was last written, and so that navigating back and forth without touching
 * an answer costs nothing.
 */
export function SaveSimulationProgressProvider({
  children,
}: PropsWithChildren) {
  const currentSimulation = useCurrentSimulation()
  // Read from the form provider, not from the simulation: `simulation.progression`
  // is written by an effect in an ancestor, which React runs *after* this one, so
  // it lags a commit behind on every folding path.
  const { progression } = useFormState()
  const engineContext = useContext(EngineContext)

  // Armed by a request, consumed by the effect below: without it the effect would
  // save on any state change, which is the auto-save we are removing.
  const isSaveRequestedRef = useRef(false)
  // Bumped alongside so a render — and therefore the effect — is guaranteed even
  // when the click changed nothing else.
  const [saveRequestCount, setSaveRequestCount] = useState(0)

  // Seeded with the server-loaded simulation: reloading mid-test and moving on
  // without answering must not write either.
  const lastSavedSignatureRef = useRef<string | null>(null)
  if (lastSavedSignatureRef.current === null) {
    lastSavedSignatureRef.current = getSignature(currentSimulation)
  }

  // Server actions called from a handler are unqueued POSTs: two quick clicks can
  // land out of order and the older snapshot would win the row.
  const saveQueueRef = useRef<Promise<unknown>>(Promise.resolve())

  const requestSaveSimulationProgress = useCallback(() => {
    isSaveRequestedRef.current = true
    setSaveRequestCount((count) => count + 1)
  }, [])

  useEffect(() => {
    if (!isSaveRequestedRef.current) return
    isSaveRequestedRef.current = false

    // Completing belongs to `endTestAction`. Writing `progression: 1` here would
    // mark the simulation completed server-side, making every later save fail
    // with a SimulationCompletedError and bouncing a reload to /fin.
    if (progression >= 1) return

    const { id, model, situation, extendedSituation, foldedSteps } =
      currentSimulation

    const signature = getSignature({
      situation,
      extendedSituation,
      foldedSteps,
    })
    if (signature === lastSavedSignatureRef.current) return
    lastSavedSignatureRef.current = signature

    const payload: SimulationSituationPayload = {
      id,
      model,
      situation,
      extendedSituation,
      foldedSteps,
      progression,
      // The engine holds fresher results than the provider state, which only
      // catches up on the next render.
      computedResults: getComputedResults(engineContext),
    }

    saveQueueRef.current = saveQueueRef.current.then(async () => {
      const result = await updateSimulationSituation(payload)

      if (!result.success) {
        setExtra('simulationId', payload.id)
        setExtra('situation', JSON.stringify(payload.situation))
        captureException(result.error)
      }
    })
  }, [saveRequestCount, currentSimulation, progression, engineContext])

  const value = useMemo(
    () => ({ requestSaveSimulationProgress }),
    [requestSaveSimulationProgress]
  )

  return (
    <SaveSimulationProgressContext.Provider value={value}>
      {children}
    </SaveSimulationProgressContext.Provider>
  )
}

/**
 * Asks for the answers given so far to be persisted. Only saves when the data
 * actually changed since the last write.
 */
export const useSaveSimulationProgress = () =>
  useContext(SaveSimulationProgressContext)
