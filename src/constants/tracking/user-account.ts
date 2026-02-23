export const captureClickHeaderMonEspaceAuthenticatedServer = {
  eventName: 'click header mon espace',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderAccessMySpaceAuthenticatedServer = {
  eventName: 'click header access my space',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderLogoutAuthenticatedServer = {
  eventName: 'click header logout',
  properties: {
    status: 'authenticated',
  },
}

export const captureClickHeaderMonEspaceUnauthenticatedServer = JSON.stringify({
  eventName: 'click header mon espace',
  properties: {
    status: 'unauthenticated',
  },
})

export const captureClickDashboardGroupPageNoGroupsCreate = {
  eventName: 'click dashboard group page create group',
  properties: {
    context: 'no groups no organisation',
  },
}

export const captureClickDashboardGroupPageCreateOrganisation = {
  eventName: 'click dashboard group page create organisation',
  properties: {
    context: 'no groups no organisation',
  },
}

export const captureClickLatestResultsViewDetail = JSON.stringify({
  eventName: 'click latest results view detail',
})

export const captureClickResultsListResultViewDetail = {
  eventName: 'click results list result view detail',
}

export const captureClickShareSimulationButton = {
  eventName: 'click share simulation button',
}

export const captureClickCategorySelector = (category: string) => ({
  eventName: 'click category selector',
  properties: {
    category,
  },
})

export const captureClickCategorySelectorMobile = (category: string) => ({
  eventName: 'click category selector mobile',
  properties: {
    category,
  },
})

export const captureClickUpdateUserEmail = {
  eventName: 'click update user email',
}

export const captureClickUpdateUserNewsletters = {
  eventName: 'click update newsletters',
}
