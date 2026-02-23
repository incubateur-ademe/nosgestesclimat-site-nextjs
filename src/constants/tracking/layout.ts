export const footerClickLanguagePosthog = (locale: string) => ({
  eventName: 'Footer click Language',
  properties: {
    locale,
  },
})


export const captureFooterNewsletterClick = () =>
  JSON.stringify({
    eventName: 'click footer newsletter cta',
  })

// Server-side tracking (data-track-posthog)
export const captureFooterClickLogo = () =>
  JSON.stringify({ eventName: 'click footer logo' })

export const captureFooterClickQuiSommesNous = () =>
  JSON.stringify({ eventName: 'click footer qui sommes-nous' })

export const captureFooterClickPlanSite = () =>
  JSON.stringify({ eventName: 'click footer plan du site' })

export const captureFooterClickContact = () =>
  JSON.stringify({ eventName: 'click footer contact' })

export const captureFooterClickInternational = () =>
  JSON.stringify({ eventName: 'click footer international' })

export const captureFooterClickStats = () =>
  JSON.stringify({ eventName: 'click footer statistiques' })

export const captureFooterClickDiffusion = () =>
  JSON.stringify({ eventName: 'click footer diffusion' })

export const captureFooterClickOrganisations = () =>
  JSON.stringify({ eventName: 'click footer organisations' })

export const captureFooterClickAmbassadeurs = () =>
  JSON.stringify({ eventName: 'click footer ambassadeurs' })

export const captureFooterClickBlog = () =>
  JSON.stringify({ eventName: 'click footer blog' })

export const captureFooterClickDocumentation = () =>
  JSON.stringify({ eventName: 'click footer documentation' })

export const captureFooterClickFAQ = () =>
  JSON.stringify({ eventName: 'click footer faq' })

export const captureFooterClickNouveautes = () =>
  JSON.stringify({ eventName: 'click footer nouveautes' })

export const captureFooterClickImpactco2 = () =>
  JSON.stringify({ eventName: 'click footer impact co2' })
