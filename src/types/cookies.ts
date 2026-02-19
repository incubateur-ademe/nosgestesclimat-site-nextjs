enum CookieChoice {
  all = 'all',
  refuse = 'refuse',
  custom = 'custom',
}

export enum CookieConsentKey {
  googleTag = 'googleTag',
  posthog = 'posthog',
}

type CookieConsentChoices = Record<CookieConsentKey, boolean>
