// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]
import { trackEvent, trackEvents } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #57
export const trackEndClickPoll = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Poll'])
}

// Figma comment #58
export const trackEndClickSaveShortcut = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Save shortcut'])
}

export const trackEndClickShare = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Share'])
}

export const trackEndToggleTargetBlock = () => {
  trackEvent(['trackEvent', 'Fin', 'Toggle Target block'])
}

export const trackEndClickHedgehog = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Hedgehog'])
}

// Figma comment #60
export const trackEndClickCategory = (category: DottedName) => {
  trackEvents(
    ['trackEvent', 'Fin', 'Click Category', `Click Category ${category}`],
    {
      eventName: 'Fin click category',
      properties: { category },
    }
  )
}

// Figma comment #63
export const trackEndClickAction = (action: DottedName) => {
  trackEvents(['trackEvent', 'Fin', 'Click Action', `Click Action ${action}`], {
    eventName: 'Fin click action',
    properties: { action },
  })
}

// Figma comment #64
export const trackEndClickActions = (subcategory?: string) => {
  trackEvents(
    ['trackEvent', 'Fin', 'Click Actions'],
    subcategory
      ? {
          eventName: 'Fin click Actions',
          properties: { subcategory },
        }
      : undefined
  )
}

// Figma comment #65
export const trackEndClickDocumentation = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Documentation'])
}

export const trackEndClickDomesticWater = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Eau domestique'], {
    eventName: 'Fin switch eau',
  })
}

export const trackEndClickJagisFirstBlock = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Jagis premier bloc'])
}

type FinTab = 'results' | 'actions' | 'groups'

export const finTabTrackEvent = (tab: FinTab) => [
  'trackEvent',
  'Fin',
  'Click Tab',
  tab.charAt(0).toUpperCase() + tab.slice(1),
]

export const captureClickFinTab = ({ tab }: { tab: FinTab }) => ({
  eventName: 'click tab fin',
  properties: { tab },
})

export const endClickFootprint = (metric: string) => [
  'trackEvent',
  'Fin',
  `Click Empreinte ${metric}`,
]

export const captureClickFootprint = (metric: string) => ({
  eventName: 'Fin click empreinte',
  properties: {
    metric,
  },
})

export const groupsLoginComplete = [
  'trackEvent',
  'Groups Login',
  'Verification code validé',
]

export const captureGroupsLoginComplete = {
  eventName: 'Groups Login - Verification code validé',
}

export const saveResultsAndSigninSignUpComplete = [
  'trackEvent',
  'Save Results and Signin Sign Up',
  'Verification code validé',
]

export const captureSaveResultsAndSigninSignUpComplete = {
  eventName: 'Save Results and Signin Sign Up - Verification code validé',
}
