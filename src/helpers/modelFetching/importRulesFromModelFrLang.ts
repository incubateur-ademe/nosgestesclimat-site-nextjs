import { captureException } from '@sentry/nextjs'

export async function importRulesFromModelFrLang({
  fileName,
  ABtesting = false,
}: {
  fileName: string
  ABtesting: boolean
}) {
  try {
    const filePath = `@incubateur-ademe/nosgestesclimat${ABtesting ? '-test' : ''}/public/${fileName}`
    return await import(filePath).then((module) => module.default)
  } catch (e) {
    captureException(e)
    return {}
  }
}
