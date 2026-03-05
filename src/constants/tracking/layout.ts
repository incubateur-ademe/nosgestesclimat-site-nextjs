// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #1

// Figma comment #5

// Figma comment #17
export const footerClickLanguage = (locale: string) => [
  'trackEvent',
  'Footer',
  'Click Language',
  `Click Language ${locale}`,
]

// Figma comment #18
export const breadcrumbClickLink = (href: string) => [
  'trackEvent',
  'Breadcrumb',
  'Click link',
  href,
]

export const footerNewsletterCTAClick = 'Footer|Click Newsletter CTA'

// Server-side tracking (data-track-event / data-track-posthog)
export const footerClickLogoServer = 'Footer|Click Logo'

export const footerClickQuiSommesNousServer = 'Footer|Click Qui sommes-nous'

export const footerClickPlanSiteServer = 'Footer|Click Plan du site'

export const footerClickContactServer = 'Footer|Click Contact'

export const footerClickInternationalServer = 'Footer|Click International'

export const footerClickStatsServer = 'Footer|Click Statistiques'

export const footerClickDiffusionServer = 'Footer|Click Diffusion'

export const footerClickOrganisationsServer = 'Footer|Click Organisations'

export const footerClickAmbassadeursServer = 'Footer|Click Ambassadeurs'

export const footerClickBlogServer = 'Footer|Click Blog'

export const footerClickDocumentationServer = 'Footer|Click Documentation'

export const footerClickFAQServer = 'Footer|Click FAQ'

export const footerClickNouveautesServer = 'Footer|Click Nouveautés'

export const footerClickImpactco2Server = 'Footer|Click Impact CO2'
