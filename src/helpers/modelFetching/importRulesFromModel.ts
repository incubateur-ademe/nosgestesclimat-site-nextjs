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
    if (ABtesting) {
      // Import dynamique sécurisé pour le module test avec fallback
      try {
        const importedModule = await import(
          /* webpackChunkName: "nosgestesclimat-test" */
          `@incubateur-ademe/nosgestesclimat-test/public/${fileName}`
        )
        return importedModule.default
      } catch (testError) {
        // Fallback vers le module principal si le test n'est pas disponible
        console.warn(
          'AB testing module not available, falling back to main module:',
          testError
        )
        const importedModule = await import(
          /* webpackChunkName: "nosgestesclimat" */
          `@incubateur-ademe/nosgestesclimat/public/${fileName}`
        )
        return importedModule.default
      }
    } else {
      // Import direct du module principal
      const importedModule = await import(
        /* webpackChunkName: "nosgestesclimat" */
        `@incubateur-ademe/nosgestesclimat/public/${fileName}`
      )
      return importedModule.default
    }
  } catch (e) {
    captureException(e)
    return {}
  }
}
