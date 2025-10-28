// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #67
export const actionsClickStart = ['trackEvent', 'Actions', 'Click Démarrer']

export const actionsClickStartPosthog = {
  eventName: 'Actions click Démarrer',
}

// Figma comment #69
export const actionsClickYes = (action: DottedName) => [
  'trackEvent',
  'Actions',
  'Click Yes',
  `Click Yes ${action}`,
]

export const actionsClickYesPosthog = (action: DottedName) => ({
  eventName: 'Actions click Yes',
  properties: {
    action,
  },
})

// Figma comment #70
export const actionsClickNo = (action: DottedName) => [
  'trackEvent',
  'Actions',
  'Click No',
  `Click No ${action}`,
]

export const actionsClickNoPosthog = (action: DottedName) => ({
  eventName: 'Actions click No',
  properties: {
    action,
  },
})

// Figma comment #71
export const actionsClickAdditionalQuestion = (action: DottedName) => [
  'trackEvent',
  'Actions',
  'Click Additional Question',
  `Click Additional Question ${action}`,
]

// Figma comment #112
export const actionsOpenAction = (action: DottedName) => [
  'trackEvent',
  'Actions',
  'Open Action',
  `Open Action ${action}`,
]

// Figma comment #114
export const actionsClickAdeme = [
  'trackEvent',
  'Actions',
  'Click More infos',
  'Click Agir ADEME',
]

export const actionsClickAdemePosthog = {
  eventName: 'Actions click Agir ADEME',
}
