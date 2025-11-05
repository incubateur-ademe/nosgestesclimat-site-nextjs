export const headerClickMonEspaceAuthenticated = [
  'trackEvent',
  'Header',
  'Click Mon Espace',
  'Authenticated',
]

export const headerClickMonEspaceUnauthenticated = [
  'trackEvent',
  'Header',
  'Click Mon Espace',
  'Unauthenticated',
]

export const captureClickHeaderMonEspaceAuthenticated = {
  eventName: 'click header mon espace',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderMonEspaceUnauthenticated = {
  eventName: 'click header mon espace',
  properties: {
    status: 'unauthenticated',
  },
}

// Server-side constants formatted for data-track-event and data-track-posthog attributes
export const headerClickMonEspaceAuthenticatedServer =
  'Header|Click Mon Espace|Authenticated'

export const headerClickMonEspaceUnauthenticatedServer =
  'Header|Click Mon Espace|Unauthenticated'

export const captureClickHeaderMonEspaceAuthenticatedServer = JSON.stringify({
  eventName: 'click header mon espace',
  properties: {
    status: 'authenticated',
  },
})

export const captureClickHeaderMonEspaceUnauthenticatedServer = JSON.stringify({
  eventName: 'click header mon espace',
  properties: {
    status: 'unauthenticated',
  },
})
