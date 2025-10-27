import { defaultProps } from './getRules'

/**
 * Returns the version of the model in the format REGION-locale-VERSION
 * Example: FR-fr-3.7.0
 */
export async function getModelVersion(): Promise<string> {
  const packageJson = await import(
    '@incubateur-ademe/nosgestesclimat/package.json'
  )
  const version = packageJson.version
  return `${defaultProps.regionCode}-${defaultProps.locale}-${version}`
}

/**
 * Extracts the region code from a model version string
 * @param modelVersion - The model version string in format REGION-locale-VERSION (e.g., "FR-fr-3.7.0")
 * @returns The region code (e.g., "FR") or "FR" as default if parsing fails
 */
export function extractRegionFromModel(modelVersion?: string): string {
  if (!modelVersion) return 'FR'

  // The model version format is: REGION-locale-VERSION
  // Example: FR-fr-3.7.0
  const parts = modelVersion.split('-')
  return parts[0] || 'FR'
}
