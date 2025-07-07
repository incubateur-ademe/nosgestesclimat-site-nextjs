import { captureException } from '@sentry/nextjs'

export async function importRulesFromModel({
  fileName,
  ABtesting = false,
}: {
  fileName: string
  ABtesting: boolean
}) {
  try {
    if (ABtesting) {
      return await import(
        `@incubateur-ademe/nosgestesclimat-test/public/${fileName}`
      ).then((module) => module.default)
    } else {
      return await import(
        `@incubateur-ademe/nosgestesclimat/public/${fileName}`
      ).then((module) => module.default)
    }
  } catch (e) {
    console.error(`Failed to import ${fileName}:`, e)
    captureException(e)
    return {}
  }
}
