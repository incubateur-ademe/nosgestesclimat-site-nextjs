// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'

// Figma comment #72
export const profilClickCtaCommencer = [
  'trackEvent',
  'Profil',
  'Click CTA',
  'Click Passer le test',
]

// Figma comment #72
export const profilClickCtaReprendre = [
  'trackEvent',
  'Profil',
  'Click CTA',
  'Click Reprendre mon test',
]

// Figma comment #72
export const profilClickCtaResultats = [
  'trackEvent',
  'Profil',
  'Click CTA',
  'Click Voir les résultats',
]

// Figma comment #73
export const profilClickRecommencer = [
  'trackEvent',
  'Profil',
  'Click CTA',
  'Click Nouveau test',
]

// Figma comment #74
export const profilClickTutoriel = ['trackEvent', 'Profil', 'Click Tutoriel']

// Figma comment #75
export const profilClickData = ['trackEvent', 'Profil', 'Click Data']

// Figma comment #76
export const profilOpenRegions = ['trackEvent', 'Profil', 'Open Regions']

// Figma comment #76
export const profilCloseRegions = ['trackEvent', 'Profil', 'Close Regions']

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
