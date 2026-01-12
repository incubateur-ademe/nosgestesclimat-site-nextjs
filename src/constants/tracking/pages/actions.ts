// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { trackEvent } from '@/utils/analytics/trackEvent'

// Figma comment #67
export const trackActionsClickStart = () => {
  trackEvent(['trackEvent', 'Actions', 'Click Démarrer'], {
    eventName: 'Actions click Démarrer',
  })
}

// Figma comment #69
export const trackActionsClickYes = (action: DottedName) => {
  trackEvent(['trackEvent', 'Actions', 'Click Yes', `Click Yes ${action}`], {
    eventName: 'Actions click Yes',
    properties: { action },
  })
}

// Figma comment #70
export const trackActionsClickNo = (action: DottedName) => {
  trackEvent(['trackEvent', 'Actions', 'Click No', `Click No ${action}`], {
    eventName: 'Actions click No',
    properties: { action },
  })
}

// Figma comment #71
export const trackActionsClickAdditionalQuestion = (action: DottedName) => {
  trackEvent([
    'trackEvent',
    'Actions',
    'Click Additional Question',
    `Click Additional Question ${action}`,
  ])
}

// Figma comment #112
export const trackActionsOpenAction = (action: DottedName) => {
  trackEvent(['trackEvent', 'Actions', 'Open Action', `Open Action ${action}`], {
    eventName: 'Actions open action',
    properties: { action },
  })
}

// Figma comment #114
export const trackActionsClickAdeme = () => {
  trackEvent(['trackEvent', 'Actions', 'Click More infos', 'Click Agir ADEME'], {
    eventName: 'Actions click Agir ADEME',
  })
}
