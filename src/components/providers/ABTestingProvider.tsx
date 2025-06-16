import {
  abTestingVisitOriginal,
  getAbTestingVisitVariation,
} from '@/constants/tracking/ab-testing'
import { trackEvent } from '@/utils/analytics/trackEvent'
import {
  createContext,
  PropsWithChildren,
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

export const ABTestingProvider = ({ children }: PropsWithChildren) => {
  const [abTests, setABTests] = useState<Record<string, boolean>>({})

  useEffect(() => {
    handleInitABTesting()
  }, [])

  const handleInitABTesting = () => {
    // Vérifier si Matomo est activé
    if (
      process.env.NEXT_PUBLIC_MATOMO_ID !== '1' &&
      process.env.NEXT_PUBLIC_MATOMO_ID !== '2'
    ) {
      console.log('Matomo not enabled in this environment')
      return
    }

    const _paq = window._paq || undefined

    if (!_paq) {
      console.log('Matomo not initialized, retrying in 500ms.')
      setTimeout(() => handleInitABTesting(), 500)
      return
    }

    _paq.push([
      'AbTesting::create',
      {
        name: '10',
        includedTargets: [
          { attribute: 'url', inverted: '0', type: 'any', value: '' },
        ],
        excludedTargets: [],
        variations: [
          {
            name: 'original',
            activate: function (event: any) {
              // usually nothing needs to be done here
              console.log('[AB Testing] Original version')
              console.log(event)

              trackEvent(abTestingVisitOriginal)
            },
          },
          {
            name: '17',
            activate: function (event: any) {
              console.log('[AB Testing] Hide tutorial version')
              console.log(event)

              setABTests({
                [AB_TESTS_LABELS.hideTutorial]: true,
              })

              trackEvent(
                getAbTestingVisitVariation(AB_TESTS_LABELS.hideTutorial)
              )
            },
          },
        ],
      },
    ])
  }

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
