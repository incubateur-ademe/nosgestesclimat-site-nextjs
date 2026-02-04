// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvents } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #67
export const trackActionsClickStart = () => {
  trackEvents(['trackEvent', 'Actions', 'Click Démarrer'], {
    eventName: 'Actions click Démarrer',
  })
}

// Figma comment #69
export const trackActionsClickYes = (action: DottedName) => {
  trackEvents(['trackEvent', 'Actions', 'Click Yes', `Click Yes ${action}`], {
    eventName: 'Actions click Yes',
    properties: { action },
  })
}

// Figma comment #70
export const trackActionsClickNo = (action: DottedName) => {
  trackEvents(['trackEvent', 'Actions', 'Click No', `Click No ${action}`], {
    eventName: 'Actions click No',
    properties: { action },
  })
}

// Figma comment #71
export const trackActionsClickAdditionalQuestion = (action: DottedName) => {
  trackEvents(
    [
      'trackEvent',
      'Actions',
      'Click Additional Question',
      `Click Additional Question ${action}`,
    ],
    {
      eventName: 'Actions click Additional Question',
      properties: { action },
    }
  )
}

// Figma comment #112
export const trackActionsOpenAction = (action: DottedName) => {
  trackEvents(
    ['trackEvent', 'Actions', 'Open Action', `Open Action ${action}`],
    {
      eventName: 'Actions open action',
      properties: { action },
    }
  )
}

// Figma comment #114
export const trackActionsClickAdeme = () => {
  trackEvents(
    ['trackEvent', 'Actions', 'Click More infos', 'Click Agir ADEME'],
    {
      eventName: 'Actions click Agir ADEME',
    }
  )
}

// Click on "Comprendre le calcul" link in action detail
// Click on "Comprendre le calcul" link in action detail
export const trackActionsClickUnderstandCalculation = (action: DottedName) => {
  trackEvents(
    [
      'trackEvent',
      'Actions',
      'Click Understand Calculation',
      `Click Understand Calculation ${action}`,
    ],
    {
      eventName: 'Actions click understand calculation',
      properties: {
        action,
      },
    }
  )
}
