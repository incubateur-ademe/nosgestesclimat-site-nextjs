import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type ABTestingContextType = {
  abTests: Record<string, boolean>
}

const ABTestingContext = createContext<ABTestingContextType>({
  abTests: {},
})

export const AB_TESTS_LABELS = {
  hideTutorial: 'hide tutorial',
}

const IS_MATOMO_AB_TEST_ENABLED = false

export const ABTestingProvider = ({ children }: PropsWithChildren) => {
  const [abTests, setABTests] = useState<Record<string, boolean>>({})

  const handleInitABTesting = () => {
    if (!IS_MATOMO_AB_TEST_ENABLED) return

    console.log('[AB Testing] in handleInitABTesting')

    // Désactiver les AB Tests dans l'environnement Cypress
    if (
      (process.env.NEXT_PUBLIC_MATOMO_ID !== '1' &&
        process.env.NEXT_PUBLIC_MATOMO_ID !== '2') ||
      (typeof window !== 'undefined' && (window as any).Cypress)
    ) {
      console.log(
        '[AB Testing] Matomo not enabled in this environment or Cypress detected'
      )
      return
    }

    const _paq = window._paq || undefined
    const Matomo = window.Matomo

    if (!Matomo) {
      setTimeout(() => handleInitABTesting(), 500)
      return
    }

    if (!Matomo.AbTesting) return

    // _paq.push([
    //   'AbTesting::create',
    //   {
    //     name: 'AvecOuSansTutoriel',
    //     includedTargets: [
    //       { attribute: 'url', inverted: '0', type: 'any', value: '' },
    //     ],
    //     excludedTargets: [],
    //     variations: [
    //       {
    //         name: 'original',
    //         activate: function (event: any) {
    //           // usually nothing needs to be done here
    //           console.log('[AB Testing] Original version')

    //           trackEvent(abTestingVisitOriginal)
    //         },
    //       },
    //       {
    //         name: 'Variation1',
    //         activate: function (event: any) {
    //           console.log('[AB Testing] Hide tutorial version')

    //           setABTests({
    //             [AB_TESTS_LABELS.hideTutorial]: true,
    //           })

    //           trackEvent(
    //             getAbTestingVisitVariation(AB_TESTS_LABELS.hideTutorial)
    //           )
    //         },
    //       },
    //     ],
    //   },
    // ])
  }

  useEffect(() => {
    if (!IS_MATOMO_AB_TEST_ENABLED) return
    handleInitABTesting()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ABTestingContext
      value={{
        abTests,
      }}>
      {children}
    </ABTestingContext>
  )
}

export const useABTesting = () => useContext(ABTestingContext)
