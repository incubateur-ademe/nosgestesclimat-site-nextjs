import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'

/**
 * Dynamically imports a model file from the `@incubateur-ademe/nosgestesclimat`
 * package installed in node_modules.
 *
 * This is the shared base for loading the current (installed) model. Callers
 * that need bundler-specific behavior - for instance statically importing an
 * optimized rule set so it ships in the bundle - wrap this and only delegate
 * the non-specialized cases to it.
 */
export async function importCurrentModel(fileName: string): Promise<NGCRules> {
  const module = await import(
    `@incubateur-ademe/nosgestesclimat/public/${fileName}`,
    { with: { type: 'json' } }
  )
  return module.default as NGCRules
}
