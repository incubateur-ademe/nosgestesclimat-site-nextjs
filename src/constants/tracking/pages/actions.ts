// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'

// Figma comment #67
export const actionsClickStart = ['trackEvent', 'Actions', 'Click Démarrer']

// Figma comment #68
export const actionsClickFilter = (category: DottedName) => [
  'trackEvent',
  'Actions',
  'Click Filter',
  `Click Filter ${category}`,
]

// Figma comment #69
export const actionsClickYes = (action: DottedName) => [
  'trackEvent',
  'Actions',
  'Click Yes',
  `Click Yes ${action}`,
]

// Figma comment #70
export const actionsClickNo = (action: DottedName) => [
  'trackEvent',
  'Actions',
  'Click No',
  `Click No ${action}`,
]

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
export const actionsClickActionsPlus = [
  'trackEvent',
  'Actions',
  'Click More infos',
  'Click Actions Plus',
]

// Figma comment #114
export const actionsClickAdeme = [
  'trackEvent',
  'Actions',
  'Click More infos',
  'Click Agir ADEME',
]
