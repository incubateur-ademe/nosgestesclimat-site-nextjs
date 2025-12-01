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

export const headerClickMonEspaceAuthenticatedServer = [
  'trackEvent',
  'Header',
  'Click Mon Espace',
  'Authenticated',
]
export const captureClickHeaderMonEspaceAuthenticatedServer = {
  eventName: 'click header mon espace',
  properties: {
    status: 'authenticated',
  },
}

export const headerClickAccessMySpaceAuthenticatedServer = [
  'trackEvent',
  'Header',
  'Click Accéder à mon Espace',
  'Authenticated',
]
export const captureClickHeaderAccessMySpaceAuthenticatedServer = {
  eventName: 'click header access my space',
  properties: {
    status: 'authenticated',
  },
}

export const headerClickLogoutAuthenticatedServer = [
  'trackEvent',
  'Header',
  'Click Déconnexion',
  'Authenticated',
]
export const captureClickHeaderLogoutAuthenticatedServer = {
  eventName: 'click header logout',
  properties: {
    status: 'authenticated',
  },
}

// Server-side tracking
export const headerClickMonEspaceUnauthenticatedServer =
  'Header|Click Mon Espace|Unauthenticated'

export const captureClickHeaderMonEspaceUnauthenticatedServer = JSON.stringify({
  eventName: 'click header mon espace',
  properties: {
    status: 'unauthenticated',
  },
})
// Server-side tracking
