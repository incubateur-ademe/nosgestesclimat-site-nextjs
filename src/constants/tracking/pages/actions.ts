import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export const actionsClickStartPosthog = {
  eventName: 'Actions click Démarrer',
}

export const actionsClickYesPosthog = (action: DottedName) => ({
  eventName: 'Actions click Yes',
  properties: {
    action,
  },
})

export const actionsClickNoPosthog = (action: DottedName) => ({
  eventName: 'Actions click No',
  properties: {
    action,
  },
})

export const actionsOpenActionPosthog = (action: DottedName) => ({
  eventName: 'Actions click open stats',
  properties: {
    action,
  },
})

export const actionsClickAdemePosthog = {
  eventName: 'Actions click Agir ADEME',
}

export const actionsClickUnderstandCalculationPosthog = (
  action: DottedName
) => ({
  eventName: 'Actions click understand calculation',
  properties: {
    action,
  },
})
