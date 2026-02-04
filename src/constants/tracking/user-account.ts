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

export const captureClickDashboardGroupPageNoGroupsCreate = {
  eventName: 'click dashboard group page create group',
  properties: {
    context: 'no groups no organisation',
  },
}

export const clickDashboardGroupPageCreateOrganisation = [
  'trackEvent',
  'User Account Groups',
  'Click Create Organisation',
  'No Groups No Organisation',
]

export const captureClickDashboardGroupPageCreateOrganisation = {
  eventName: 'click dashboard group page create organisation',
  properties: {
    context: 'no groups no organisation',
  },
}

export const clickLatestResultsViewDetail =
  'User Account Results|Click Latest Results View Detail'

export const captureClickLatestResultsViewDetail = JSON.stringify({
  eventName: 'click latest results view detail',
})

export const clickResultsListResultViewDetail = [
  'trackEvent',
  'User Account Results',
  'Click Results List Result View Detail',
]

export const captureClickResultsListResultViewDetail = {
  eventName: 'click results list result view detail',
}

export const clickShareSimulationButton = [
  'trackEvent',
  'User Account Results',
  'Click Share Simulation Button',
]

export const captureClickShareSimulationButton = {
  eventName: 'click share simulation button',
}

export const clickCategorySelector = (category: string) => [
  'trackEvent',
  'User Account Results',
  'Click Category Selector',
  category,
]

export const captureClickCategorySelector = (category: string) => ({
  eventName: 'click category selector',
  properties: {
    category,
  },
})

export const clickCategorySelectorMobile = (category: string) => [
  'trackEvent',
  'User Account Results',
  'Click Category Selector Mobile',
  category,
]

export const captureClickCategorySelectorMobile = (category: string) => ({
  eventName: 'click category selector mobile',
  properties: {
    category,
  },
})

export const clickUpdateUserEmail = [
  'trackEvent',
  'User Account Settings',
  'Click Update User Email',
]

export const captureClickUpdateUserEmail = {
  eventName: 'click update user email',
}

export const clickUpdateUserNewsletters = [
  'trackEvent',
  'User Account Settings',
  'Click Update Newsletters',
]

export const captureClickUpdateUserNewsletters = {
  eventName: 'click update newsletters',
}
