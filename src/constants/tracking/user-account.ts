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

/** Server-side tracking */
export const headerClickMonEspaceUnauthenticatedServer =
  'Header|Click Mon Espace|Unauthenticated'

export const captureClickHeaderMonEspaceUnauthenticatedServer = JSON.stringify({
  eventName: 'click header mon espace',
  properties: {
    status: 'unauthenticated',
  },
})
/** Server-side tracking */

export const clickDashboardGroupPageNoGroupsCreate = [
  'trackEvent',
  'User Account Groups',
  'Click Create Group',
  'No Groups No Organisation',
]

export const clickDashboardGroupPageCreateOrganisation = [
  'trackEvent',
  'User Account Groups',
  'Click Create Organisation',
  'No Groups No Organisation',
]

export const clickLatestResultsViewDetail = [
  'trackEvent',
  'User Account Results',
  'Click Latest Results View Detail',
]

export const clickResultsListResultViewDetail = [
  'trackEvent',
  'User Account Results',
  'Click Results List Result View Detail',
]

export const clickShareSimulationButton = [
  'trackEvent',
  'User Account Results',
  'Click Share Simulation Button',
]

export const clickCategorySelector = (category: string) => [
  'trackEvent',
  'User Account Results',
  'Click Category Selector',
  category,
]

export const clickCategorySelectorMobile = (category: string) => [
  'trackEvent',
  'User Account Results',
  'Click Category Selector Mobile',
  category,
]

export const clickUpdateUserEmail = [
  'trackEvent',
  'User Account Settings',
  'Click Update User Email',
]

export const clickUpdateUserNewsletters = [
  'trackEvent',
  'User Account Settings',
  'Click Update User Newsletters',
]
