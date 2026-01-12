// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type TrackingData = {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

// Figma comment #67
export const actionsClickStart = (): TrackingData => ({
  matomo: ['trackEvent', 'Actions', 'Click Démarrer'],
  posthog: {
    eventName: 'Actions click Démarrer',
  },
})

// Figma comment #69
export const actionsClickYes = (action: DottedName): TrackingData => ({
  matomo: ['trackEvent', 'Actions', 'Click Yes', `Click Yes ${action}`],
  posthog: {
    eventName: 'Actions click Yes',
    properties: { action },
  },
})

// Figma comment #70
export const actionsClickNo = (action: DottedName): TrackingData => ({
  matomo: ['trackEvent', 'Actions', 'Click No', `Click No ${action}`],
  posthog: {
    eventName: 'Actions click No',
    properties: { action },
  },
})

// Figma comment #71
export const actionsClickAdditionalQuestion = (
  action: DottedName
): TrackingData => ({
  matomo: [
    'trackEvent',
    'Actions',
    'Click Additional Question',
    `Click Additional Question ${action}`,
  ],
})

// Figma comment #112
export const actionsOpenAction = (action: DottedName): TrackingData => ({
  matomo: ['trackEvent', 'Actions', 'Open Action', `Open Action ${action}`],
  posthog: {
    eventName: 'Actions open action',
    properties: { action },
  },
})

// Figma comment #114
export const actionsClickAdeme = (): TrackingData => ({
  matomo: ['trackEvent', 'Actions', 'Click More infos', 'Click Agir ADEME'],
  posthog: {
    eventName: 'Actions click Agir ADEME',
  },
})
