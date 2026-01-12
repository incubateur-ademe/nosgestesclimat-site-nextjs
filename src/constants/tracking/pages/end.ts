// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

interface TrackingData {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

// Figma comment #57
export const endClickPoll = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Poll'],
})

// Figma comment #58
export const endClickSaveShortcut = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Save shortcut'],
})

export const endClickShare = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Share'],
})

export const endToggleTargetBlock = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Toggle Target block'],
})

export const endClickHedgehog = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Hedgehog'],
})

// Figma comment #60
export const endClickCategory = (category: DottedName): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Category', `Click Category ${category}`],
  posthog: {
    eventName: 'Fin click category',
    properties: { category },
  },
})

// Figma comment #62
export const endClickSaveSimulation = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Save simulation'],
})

// Figma comment #63
export const endClickAction = (action: DottedName): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Action', `Click Action ${action}`],
})

// Figma comment #64
export const endClickActions = (subcategory?: string): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Actions'],
  posthog: subcategory
    ? {
        eventName: 'Fin click Actions',
        properties: { subcategory },
      }
    : undefined,
})

// Figma comment #65
export const endClickDocumentation = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Documentation'],
})

export const endClickDomesticWater = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Eau domestique'],
  posthog: {
    eventName: 'Fin switch eau',
  },
})

export const endClickJagisFirstBlock = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Jagis premier bloc'],
})

export const endClickJagisSecondBlock = (): TrackingData => ({
  matomo: ['trackEvent', 'Fin', 'Click Jagis second bloc'],
})

export const endClickFootprint = (metric: string): TrackingData => ({
  matomo: ['trackEvent', 'Fin', `Click Empreinte ${metric}`],
  posthog: {
    eventName: 'Fin click empreinte',
    properties: { metric },
  },
})
