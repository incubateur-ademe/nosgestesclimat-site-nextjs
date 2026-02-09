// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { trackEvent, trackEvents } from '@/utils/analytics/trackEvent'

// Figma comment #1
<<<<<<< HEAD
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
||||||| a37acc3a1
export const headerClickLogo = ['trackEvent', 'Header', 'Click Logo']

// Figma comment #2
export const headerClickTest = ['trackEvent', 'Header', 'Click Test']

// Figma comment #3
export const headerClickActions = ['trackEvent', 'Header', 'Click Actions']

// Figma comment #4
export const headerClickClassements = [
  'trackEvent',
  'Header',
  'Click Classements',
]
=======
>>>>>>> origin/preprod

// Figma comment #5
<<<<<<< HEAD
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
  trackEvents(['trackEvent', 'Footer', 'Click Qui sommes-nous'], {
    eventName: 'Footer click qui sommes-nous',
  })
}

// Figma comment #11
export const trackFooterClickBlog = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Blog'], {
    eventName: 'Footer click blog',
  })
}

// Figma comment #12
export const trackFooterClickDocumentation = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Documentation'], {
    eventName: 'Footer click documentation',
  })
}

// Figma comment #13
export const trackFooterClickAmbassadeurs = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Ambassadeurs'])
}

export const trackFooterClickFAQ = () => {
  trackEvents(['trackEvent', 'Footer', 'Click FAQ'], {
    eventName: 'Footer click FAQ',
  })
}

export const trackFooterClickContact = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Contact'], {
    eventName: 'Footer click contact',
  })
}

export const trackFooterClickDiffusion = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Diffusion'], {
    eventName: 'Footer click diffusion',
  })
}

// Figma comment #14
export const trackFooterClickPlanSite = () => {
  trackEvent(['trackEvent', 'Footer', 'Click Plan du site'])
}

// Figma comment #15
export const trackFooterClickOrganisations = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Organisations'], {
    eventName: 'Footer click organisations',
  })
}

// Figma comment #16
export const trackFooterClickInternational = () => {
  trackEvents(['trackEvent', 'Footer', 'Click International'], {
    eventName: 'Footer click international',
  })
}

export const trackFooterClickStats = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Statistiques'], {
    eventName: 'Footer click statistiques',
  })
}

export const trackFooterClickImpactco2 = () => {
  trackEvents(['trackEvent', 'Footer', 'Click Impact CO2'], {
    eventName: 'Footer click Impact CO2',
  })
}
||||||| a37acc3a1
export const headerClickProfil = ['trackEvent', 'Header', 'Click Profil']

// Figma comment #7
export const headerClickOrganisation = [
  'trackEvent',
  'Header',
  'Click Organisation',
]
=======
>>>>>>> origin/preprod

// Figma comment #17
export const trackFooterClickLanguage = (locale: string) => {
  trackEvents(
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
export const breadcrumbClickLink = (href: string) => [
  'trackEvent',
  'Breadcrumb',
  'Click link',
  href,
]

export const footerNewsletterCTAClick = 'Footer|Click Newsletter CTA'

export const captureFooterNewsletterClick = () =>
  JSON.stringify({
    eventName: 'click footer newsletter cta',
  })

// Server-side tracking (data-track-event / data-track-posthog)
export const footerClickLogoServer = 'Footer|Click Logo'
export const captureFooterClickLogo = () =>
  JSON.stringify({ eventName: 'click footer logo' })

export const footerClickQuiSommesNousServer = 'Footer|Click Qui sommes-nous'
export const captureFooterClickQuiSommesNous = () =>
  JSON.stringify({ eventName: 'click footer qui sommes-nous' })

export const footerClickPlanSiteServer = 'Footer|Click Plan du site'
export const captureFooterClickPlanSite = () =>
  JSON.stringify({ eventName: 'click footer plan du site' })

export const footerClickContactServer = 'Footer|Click Contact'
export const captureFooterClickContact = () =>
  JSON.stringify({ eventName: 'click footer contact' })

export const footerClickInternationalServer = 'Footer|Click International'
export const captureFooterClickInternational = () =>
  JSON.stringify({ eventName: 'click footer international' })

export const footerClickStatsServer = 'Footer|Click Statistiques'
export const captureFooterClickStats = () =>
  JSON.stringify({ eventName: 'click footer statistiques' })

export const footerClickDiffusionServer = 'Footer|Click Diffusion'
export const captureFooterClickDiffusion = () =>
  JSON.stringify({ eventName: 'click footer diffusion' })

export const footerClickOrganisationsServer = 'Footer|Click Organisations'
export const captureFooterClickOrganisations = () =>
  JSON.stringify({ eventName: 'click footer organisations' })

export const footerClickAmbassadeursServer = 'Footer|Click Ambassadeurs'
export const captureFooterClickAmbassadeurs = () =>
  JSON.stringify({ eventName: 'click footer ambassadeurs' })

export const footerClickBlogServer = 'Footer|Click Blog'
export const captureFooterClickBlog = () =>
  JSON.stringify({ eventName: 'click footer blog' })

export const footerClickDocumentationServer = 'Footer|Click Documentation'
export const captureFooterClickDocumentation = () =>
  JSON.stringify({ eventName: 'click footer documentation' })

export const footerClickFAQServer = 'Footer|Click FAQ'
export const captureFooterClickFAQ = () =>
  JSON.stringify({ eventName: 'click footer faq' })

export const footerClickNouveautesServer = 'Footer|Click Nouveautés'
export const captureFooterClickNouveautes = () =>
  JSON.stringify({ eventName: 'click footer nouveautes' })

export const footerClickImpactco2Server = 'Footer|Click Impact CO2'
export const captureFooterClickImpactco2 = () =>
  JSON.stringify({ eventName: 'click footer impact co2' })
