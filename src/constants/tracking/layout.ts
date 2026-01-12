// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

interface TrackingData {
  matomo: (string | null)[]
  posthog?: {
    eventName: string
    properties?: Record<string, string | number | boolean | null | undefined>
  }
}

// Figma comment #1
export const headerClickLogo = (): TrackingData => ({
  matomo: ['trackEvent', 'Header', 'Click Logo'],
})

// Figma comment #2
export const headerClickTest = (): TrackingData => ({
  matomo: ['trackEvent', 'Header', 'Click Test'],
})

// Figma comment #3
export const headerClickActions = (): TrackingData => ({
  matomo: ['trackEvent', 'Header', 'Click Actions'],
})

// Figma comment #4
export const headerClickClassements = (): TrackingData => ({
  matomo: ['trackEvent', 'Header', 'Click Classements'],
})

// Figma comment #5
export const headerClickProfil = (): TrackingData => ({
  matomo: ['trackEvent', 'Header', 'Click Profil'],
})

// Figma comment #7
export const headerClickOrganisation = (): TrackingData => ({
  matomo: ['trackEvent', 'Header', 'Click Organisation'],
})

// Figma comment #8
export const footerClickLogo = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Logo'],
})

// Figma comment #9
export const footerClickNouveautes = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Nouveautés'],
})

// Figma comment #10
export const footerClickQuiSommesNous = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Qui sommes-nous'],
  posthog: {
    eventName: 'Footer click qui sommes-nous',
  },
})

// Figma comment #11
export const footerClickBlog = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Blog'],
  posthog: {
    eventName: 'Footer click blog',
  },
})

// Figma comment #12
export const footerClickDocumentation = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Documentation'],
  posthog: {
    eventName: 'Footer click documentation',
  },
})

// Figma comment #13
export const footerClickAmbassadeurs = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Ambassadeurs'],
})

export const footerClickFAQ = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click FAQ'],
  posthog: {
    eventName: 'Footer click FAQ',
  },
})

export const footerClickContact = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Contact'],
  posthog: {
    eventName: 'Footer click contact',
  },
})

export const footerClickDiffusion = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Diffusion'],
  posthog: {
    eventName: 'Footer click diffusion',
  },
})

// Figma comment #14
export const footerClickPlanSite = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Plan du site'],
})

// Figma comment #15
export const footerClickOrganisations = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Organisations'],
  posthog: {
    eventName: 'Footer click organisations',
  },
})

// Figma comment #16
export const footerClickInternational = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click International'],
  posthog: {
    eventName: 'Footer click international',
  },
})

export const footerClickStats = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Statistiques'],
  posthog: {
    eventName: 'Footer click statistiques',
  },
})

export const footerClickImpactco2 = (): TrackingData => ({
  matomo: ['trackEvent', 'Footer', 'Click Impact CO2'],
  posthog: {
    eventName: 'Footer click Impact CO2',
  },
})

// Figma comment #17
export const footerClickLanguage = (locale: string): TrackingData => ({
  matomo: [
    'trackEvent',
    'Footer',
    'Click Language',
    `Click Language ${locale}`,
  ],
  posthog: {
    eventName: 'Footer click language',
    properties: { locale },
  },
})

// Figma comment #18
export const breadcrumbClickLink = (href: string): TrackingData => ({
  matomo: ['trackEvent', 'Breadcrumb', 'Click link', href],
})
