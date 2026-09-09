// Source de vérité des templateIds transactionnels Brevo.
type ValueOf<T> = T[keyof T]

const FrTemplateIds = {
  SIMULATION_COMPLETED: 55,
  GROUP_CREATED: 57,
  GROUP_JOINED: 58,
  VERIFICATION_CODE: 66,
  ORGANISATION_CREATED: 70,
  ORGANISATION_JOINED: 122,
  POLL_CREATED: 126,
  SIMULATION_IN_PROGRESS: 102,
  API_VERIFICATION_CODE: 116,
  NEWSLETTER_CONFIRMATION: 118,
  SIGN_UP: 137,
  SIGN_UP_SIMULATION_COMPLETED: 138,
} as const

const EnTemplateIds = {
  VERIFICATION_CODE: 125,
  ORGANISATION_CREATED: 124,
  ORGANISATION_JOINED: 123,
  POLL_CREATED: 127,
  SIGN_UP: 139,
  SIGN_UP_SIMULATION_COMPLETED: 140,
} as const

export const TemplateIds = {
  en: EnTemplateIds,
  fr: FrTemplateIds,
} as const

export type TemplateId =
  | ValueOf<typeof FrTemplateIds>
  | ValueOf<typeof EnTemplateIds>
