// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #76
export const profilOpenRegions = ['trackEvent', 'Profil', 'Open Regions']

// Figma comment #77
export const profilClickRegion = (region: string) => [
  'trackEvent',
  'Profil',
  'Click Region',
  `Click Region ${region}`,
]

// Figma comment #78
export const profilClickCategory = (category: DottedName) => [
  'trackEvent',
  'Profil',
  'Click Category',
  `Click Category ${category}`,
]

// Figma comment #79
export const profilClickSubCategory = (subcategory: DottedName) => [
  'trackEvent',
  'Profil',
  'Click SubCategory',
  `Click SubCategory ${subcategory}`,
]

// Figma comment #80
export const profilClickQuestion = (question: DottedName) => [
  'trackEvent',
  'Profil',
  'Click Question',
  `Click Question ${question}`,
]

// Figma comment #81
export const profilDeleteSimulation = [
  'trackEvent',
  'Profil',
  'Delete Simulation',
]

// Figma comment #82
export const profilLoadSimulation = ['trackEvent', 'Profil', 'Load Simulation']
