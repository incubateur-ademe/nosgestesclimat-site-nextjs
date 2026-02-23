import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const endClickCategoryPosthog = (category: DottedName) => ({
  eventName: 'Fin click Category',
  properties: {
    category,
  },
})

export const endClickActionsPosthog = (subcategory: string) => ({
  eventName: 'Fin click Actions',
  properties: {
    subcategory,
  },
})

export const endClickDomesticWaterPosthog = {
  eventName: 'Fin click Eau domestique',
}

type FinTab = 'results' | 'actions' | 'groups'

export const captureClickFinTab = ({ tab }: { tab: FinTab }) => ({
  eventName: 'click tab fin',
  properties: { tab },
})

export const captureClickFootprint = (metric: string) => ({
  eventName: 'Fin click empreinte',
  properties: {
    metric,
  },
})

export const captureGroupsLoginComplete = {
  eventName: 'Groups Login - Verification code validé',
}

export const captureSaveResultsAndSigninSignUpComplete = {
  eventName: 'Save Results and Signin Sign Up - Verification code validé',
}
