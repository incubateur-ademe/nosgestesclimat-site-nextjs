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

export const footerClickLanguagePosthog = (locale: string) => ({
  eventName: 'Footer click Language',
  properties: {
    locale,
  },
})

// Figma comment #18
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
