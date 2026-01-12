// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvent } from '@/utils/analytics/trackEvent'

// Figma comment #1
export const trackHeaderClickLogo = () => {
  trackEvent(['trackEvent', 'Header', 'Click Logo'])
}

// Figma comment #2
export const trackHeaderClickTest = () => {
  trackEvent(['trackEvent', 'Header', 'Click Test'])
}

// Figma comment #3
export const trackHeaderClickActions = () => {
  trackEvent(['trackEvent', 'Header', 'Click Actions'])
}

// Figma comment #4
export const trackHeaderClickClassements = () => {
  trackEvent(['trackEvent', 'Header', 'Click Classements'])
}

// Figma comment #5
export const trackHeaderClickProfil = () => {
  trackEvent(['trackEvent', 'Header', 'Click Profil'])
}

// Figma comment #7
export const trackHeaderClickOrganisation = () => {
  trackEvent(['trackEvent', 'Header', 'Click Organisation'])
}

// Figma comment #8
export const trackFooterClickLogo = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Logo'])
}

// Figma comment #9
export const trackFooterClickNouveautes = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Nouveautés'])
}

// Figma comment #10
export const trackFooterClickQuiSommesNous = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Qui sommes-nous'], {
    eventName: 'Footer click qui sommes-nous',
  })
}

// Figma comment #11
export const trackFooterClickBlog = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Blog'], {
    eventName: 'Footer click blog',
  })
}

// Figma comment #12
export const trackFooterClickDocumentation = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Documentation'], {
    eventName: 'Footer click documentation',
  })
}

// Figma comment #13
export const trackFooterClickAmbassadeurs = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Ambassadeurs'])
}

export const trackFooterClickFAQ = () => {
  trackEvent(['trackEvent', 'Footer', 'Click FAQ'], {
    eventName: 'Footer click FAQ',
  })
}

export const trackFooterClickContact = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Contact'], {
    eventName: 'Footer click contact',
  })
}

export const trackFooterClickDiffusion = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Diffusion'], {
    eventName: 'Footer click diffusion',
  })
}

// Figma comment #14
export const trackFooterClickPlanSite = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Plan du site'])
}

// Figma comment #15
export const trackFooterClickOrganisations = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Organisations'], {
    eventName: 'Footer click organisations',
  })
}

// Figma comment #16
export const trackFooterClickInternational = () => {
  trackEvent(['trackEvent', 'Footer', 'Click International'], {
    eventName: 'Footer click international',
  })
}

export const trackFooterClickStats = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Statistiques'], {
    eventName: 'Footer click statistiques',
  })
}

export const trackFooterClickImpactco2 = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Impact CO2'], {
    eventName: 'Footer click Impact CO2',
  })
}

// Figma comment #17
export const trackFooterClickLanguage = (locale: string) => {
  trackEvent(
    ['trackEvent', 'Footer', 'Click Language', `Click Language ${locale}`],
    {
      eventName: 'Footer click language',
      properties: { locale },
    }
  )
}

// Figma comment #18
export const trackBreadcrumbClickLink = (href: string) => {
  trackEvent(['trackEvent', 'Breadcrumb', 'Click link', href])
}
