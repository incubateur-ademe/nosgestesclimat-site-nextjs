export const ABTEST_KEY = 'ab-test-first-question'
export const FLAG_VARIANT_KEY = 'change-first-question'
export const NEW_TUTORIAL_FLAG_KEY =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'ab-test-nouvelle-page-tutoriel-prod'
    : 'ab-test-nouvelle-page-tutoriel'
export const NEW_TUTORIAL_VARIANT_KEY = 'new-tutorial'
