// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'
import { NorthStarType, NorthStarValue } from '@/types/northstar'

// Figma comment #57
export const endClickPoll = ['trackEvent', 'Fin', 'Click Poll']

// Figma comment #58
export const endClickSaveShortcut = ['trackEvent', 'Fin', 'Click Save shortcut']

export const endClickShareShortcut = [
  'trackEvent',
  'Fin',
  'Click Share shortcut',
]

export const endClickShare = ['trackEvent', 'Fin', 'Click Share']

export const endToggleTargetBlock = ['trackEvent', 'Fin', 'Toggle Target block']

export const endClickHedgehog = ['trackEvent', 'Fin', 'Click Hedgehog']

// Figma comment #59
export const endClickEmpreinte = ['trackEvent', 'Fin', 'Click Empreinte']

// Figma comment #60
export const endClickCategory = (category: DottedName) => [
  'trackEvent',
  'Fin',
  'Click Category',
  `Click Category ${category}`,
]

// Figma comment #61
export const endClickChangeAnswers = [
  'trackEvent',
  'Fin',
  'Click Change answers',
]

// Figma comment #62
export const endClickSaveSimulation = [
  'trackEvent',
  'Fin',
  'Click Save simulation',
]

// Figma comment #113
export const endClickCreateGroup = ['trackEvent', 'Fin', 'Click Create group']

// Figma comment #63
export const endClickAction = (action: DottedName) => [
  'trackEvent',
  'Fin',
  'Click Action',
  `Click Action ${action}`,
]

// Figma comment #64
export const endClickActions = ['trackEvent', 'Fin', 'Click Actions']

// Figma comment #65
export const endClickDocumentation = [
  'trackEvent',
  'Fin',
  'Click Documentation',
]

// Figma comment #66
type NorthstarProps = {
  type: NorthStarType
  value: NorthStarValue
}
export const endClickNorthstar = ({ type, value }: NorthstarProps) => [
  'trackEvent',
  'Fin',
  'Click Northstar',
  `Click Northstar ${type}`,
  String(value),
]
