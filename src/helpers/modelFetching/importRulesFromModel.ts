import { captureException } from '@sentry/nextjs'

export async function importRulesFromModel({ fileName }: { fileName: string }) {
  console.log('dynamically importing rules', fileName)
  try {
    return await import(
      `@incubateur-ademe/nosgestesclimat/public/${fileName}`
    ).then((module) => module.default)
  } catch (e) {
    captureException(e)
    return {}
  }
}
