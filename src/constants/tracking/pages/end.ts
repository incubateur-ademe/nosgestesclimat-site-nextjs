// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]
import { trackEvents } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #57
export const trackEndClickPoll = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Poll'])
}

// Figma comment #58
export const trackEndClickSaveShortcut = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Save shortcut'])
}

export const trackEndClickShare = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Share'])
}

export const trackEndToggleTargetBlock = () => {
  trackEvents(['trackEvent', 'Fin', 'Toggle Target block'])
}

export const trackEndClickHedgehog = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Hedgehog'])
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
  trackEvents(['trackEvent', 'Fin', 'Click Documentation'])
}

export const trackEndClickDomesticWater = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Eau domestique'], {
    eventName: 'Fin switch eau',
  })
}

export const trackEndClickJagisFirstBlock = () => {
  trackEvents(['trackEvent', 'Fin', 'Click Jagis premier bloc'])
}

type FinTab = 'results' | 'actions' | 'groups'

export const trackFinTabClick = (tab: FinTab) => {
  trackEvents(
    [
      'trackEvent',
      'Fin',
      'Click Tab',
      tab.charAt(0).toUpperCase() + tab.slice(1),
    ],
    {
      eventName: 'click tab fin',
      properties: { tab },
    }
  )
}

export const trackEndClickFootprint = (metric: string) => {
  trackEvents(['trackEvent', 'Fin', `Click Empreinte ${metric}`], {
    eventName: 'Fin click empreinte',
    properties: { metric },
  })
}

export const trackGroupsLoginComplete = () => {
  trackEvents(['trackEvent', 'Groups Login', 'Verification code validé'], {
    eventName: 'Groups Login - Verification code validé',
  })
}

export const trackSaveResultsAndSigninSignUpComplete = () => {
  trackEvents(
    ['trackEvent', 'Save Results and Signin Sign Up', 'Verification code validé'],
    {
      eventName: 'Save Results and Signin Sign Up - Verification code validé',
    }
  )
}

// Old-style exports for server components that still use the old pattern
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
