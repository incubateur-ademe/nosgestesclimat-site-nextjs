import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'

/**
 * Site-local copy of `importCurrentModel`.
 *
 * The core version is compiled to `dist/` with a `__rewriteRelativeImportExtension`
 * wrapper around the dynamic `import()`. Turbopack then sees a wrapped call
 * expression instead of a raw template-literal `import()` and refuses to build
 * a context module over the `public/` folder ("expression is too dynamic").
 *
 * Keeping a raw, untransformed copy inside the site app lets Next.js/Turbopack
 * analyze and bundle it directly.
 */
export async function importCurrentModel(fileName: string): Promise<NGCRules> {
  const model = await import(
    `@incubateur-ademe/nosgestesclimat/public/${fileName}`,
    { with: { type: 'json' } }
  )
  return model.default as NGCRules
}
