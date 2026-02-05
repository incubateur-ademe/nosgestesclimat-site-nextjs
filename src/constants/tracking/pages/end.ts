// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #57
export const endClickPoll = ['trackEvent', 'Fin', 'Click Poll']

// Figma comment #58
export const endClickSaveShortcut = ['trackEvent', 'Fin', 'Click Save shortcut']

export const endClickShare = ['trackEvent', 'Fin', 'Click Share']

export const endToggleTargetBlock = ['trackEvent', 'Fin', 'Toggle Target block']

export const endClickHedgehog = ['trackEvent', 'Fin', 'Click Hedgehog']

// Figma comment #60
export const endClickCategory = (category: DottedName) => [
  'trackEvent',
  'Fin',
  'Click Category',
  `Click Category ${category}`,
]

// Figma comment #63
export const endClickAction = (action: DottedName) => [
  'trackEvent',
  'Fin',
  'Click Action',
  `Click Action ${action}`,
]

// Figma comment #64
export const endClickActions = ['trackEvent', 'Fin', 'Click Actions']

export const endClickActionsPosthog = (subcategory: string) => ({
  eventName: 'Fin click Actions',
  properties: {
    subcategory,
  },
})

// Figma comment #65
export const endClickDocumentation = [
  'trackEvent',
  'Fin',
  'Click Documentation',
]

export const endClickDomesticWater = [
  'trackEvent',
  'Fin',
  'Click Eau domestique',
]

export const endClickJagisFirstBlock = [
  'trackEvent',
  'Fin',
  'Click Jagis premier bloc',
]

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
