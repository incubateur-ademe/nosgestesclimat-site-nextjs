// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { NorthStarType, NorthStarValue } from '@/types/northstar'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'

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

// Figma comment #60
export const endClickCategory = (category: DottedName) => [
  'trackEvent',
  'Fin',
  'Click Category',
  `Click Category ${category}`,
]

// Figma comment #62
export const endClickSaveSimulation = [
  'trackEvent',
  'Fin',
  'Click Save simulation',
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

export const endClickJagisSecondBlock = [
  'trackEvent',
  'Fin',
  'Click Jagis second bloc',
]
