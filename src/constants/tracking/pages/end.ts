// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Figma comment #57
export const trackEndClickPoll = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Poll'])
}

// Figma comment #58
export const trackEndClickSaveShortcut = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Save shortcut'])
}

export const trackEndClickShare = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Share'])
}

export const trackEndToggleTargetBlock = () => {
  trackEvent(['trackEvent', 'Fin', 'Toggle Target block'])
}

export const trackEndClickHedgehog = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Hedgehog'])
}

// Figma comment #60
export const trackEndClickCategory = (category: DottedName) => {
  trackEvent(
    ['trackEvent', 'Fin', 'Click Category', `Click Category ${category}`],
    {
      eventName: 'Fin click category',
      properties: { category },
    }
  )
}

// Figma comment #62
export const trackEndClickSaveSimulation = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Save simulation'])
}

// Figma comment #63
export const trackEndClickAction = (action: DottedName) => {
  trackEvent(['trackEvent', 'Fin', 'Click Action', `Click Action ${action}`])
}

// Figma comment #64
export const trackEndClickActions = (subcategory?: string) => {
  trackEvent(
    ['trackEvent', 'Fin', 'Click Actions'],
    subcategory
      ? {
          eventName: 'Fin click Actions',
          properties: { subcategory },
        }
      : undefined
  )
}

// Figma comment #65
export const trackEndClickDocumentation = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Documentation'])
}

export const trackEndClickDomesticWater = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Eau domestique'], {
    eventName: 'Fin switch eau',
  })
}

export const trackEndClickJagisFirstBlock = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Jagis premier bloc'])
}

export const trackEndClickJagisSecondBlock = () => {
  trackEvent(['trackEvent', 'Fin', 'Click Jagis second bloc'])
}

export const trackEndClickFootprint = (metric: string) => {
  trackEvent(['trackEvent', 'Fin', `Click Empreinte ${metric}`], {
    eventName: 'Fin click empreinte',
    properties: { metric },
  })
}
