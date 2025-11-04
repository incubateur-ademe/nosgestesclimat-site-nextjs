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
