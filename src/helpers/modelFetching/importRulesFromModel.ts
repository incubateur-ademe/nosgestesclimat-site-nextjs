import { captureException } from '@sentry/nextjs'

export async function importRulesFromModel({
  fileName,
  ABtesting = false,
}: {
  fileName: string
  ABtesting: boolean
}) {
  const filePath = `@incubateur-ademe/nosgestesclimat${ABtesting && '-test'}/public/${fileName}`
  try {
    return await import(filePath).then((module) => module.default)
  } catch (e) {
    captureException(e)
    return {}
  }
}
