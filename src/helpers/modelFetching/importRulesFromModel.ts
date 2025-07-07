import { captureException } from '@sentry/nextjs'

// Import statique des modules principaux pour éviter les problèmes de build

export async function importRulesFromModel({
  fileName,
  ABtesting = false,
}: {
  fileName: string
  ABtesting: boolean
}) {
  try {
    // Import direct du module principal
    const importedModule = await import(
      /* webpackChunkName: "nosgestesclimat" */
      `@incubateur-ademe/nosgestesclimat/public/${fileName}`
    )
    return importedModule.default
  } catch (e) {
    captureException(e)
    return {}
  }
}
