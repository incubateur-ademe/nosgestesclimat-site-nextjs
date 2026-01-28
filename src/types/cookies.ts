export enum CookieChoice {
  all = 'all',
  refuse = 'refuse',
  custom = 'custom',
}

export enum CookieConsentKey {
  googleAds = 'googleAds',
  posthog = 'posthog',
}

export type CookieConsentChoices = Record<CookieConsentKey, boolean>
