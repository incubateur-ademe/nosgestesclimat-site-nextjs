type MonEspaceTab = 'results' | 'actions' | 'groups' | 'settings'

// Server-side constants formatted for data-track-posthog attributes
export const captureClickMonEspaceTabServer = (tab: MonEspaceTab) =>
  JSON.stringify({
    eventName: 'click tab mon espace',
    properties: { tab },
  })

export const captureClickMySpaceNoResultsStartTest = JSON.stringify({
  eventName: 'click mon espace pas de résultats',
})

export const captureLoginComplete = {
  eventName: 'Connexion - Verification code validé',
}

export const captureSignupComplete = {
  eventName: 'Mon Espace - Inscription - Verification code validé',
}
