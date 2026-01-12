export type MonEspaceTab = 'results' | 'actions' | 'groups' | 'settings'

export const monEspaceTabTrackEvent = (tab: MonEspaceTab) => [
  'trackEvent',
  'MonEspace',
  'Click Tab',
  tab.charAt(0).toUpperCase() + tab.slice(1),
]

export const captureClickMonEspaceTab = ({ tab }: { tab: MonEspaceTab }) => ({
  eventName: 'click tab mon espace',
  properties: { tab },
})

// Server-side constants formatted for data-track-event and data-track-posthog attributes
export const monEspaceTabTrackEventServer = (tab: MonEspaceTab) =>
  `MonEspace|Click Tab|${tab.charAt(0).toUpperCase() + tab.slice(1)}`

export const captureClickMonEspaceTabServer = (tab: MonEspaceTab) =>
  JSON.stringify({
    eventName: 'click tab mon espace',
    properties: { tab },
  })

export const clickJagisActionBanner = [
  'trackEvent',
  'Mon Espace - Actions',
  'Click Jagis action banner',
]

export const clickMySpaceNoResultsStartTest =
  'MonEspace|Click passer le test pas de résultats'

export const captureClickMySpaceNoResultsStartTest = JSON.stringify({
  eventName: 'click mon espace pas de résultats',
})

export const loginComplete = [
  'trackEvent',
  'Connexion',
  'Verification code validé',
]

export const captureLoginComplete = {
  eventName: 'Connexion - Verification code validé',
}

export const signupComplete = [
  'trackEvent',
  'Mon Espace - Inscription',
  'Verification code validé',
]

export const captureSignupComplete = {
  eventName: 'Mon Espace - Inscription - Verification code validé',
}
