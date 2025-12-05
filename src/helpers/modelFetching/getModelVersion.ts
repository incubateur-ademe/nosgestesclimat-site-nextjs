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

export function extractRegionFromModel(modelVersion?: string): string {
  if (!modelVersion) return 'FR'

  // The model version format is: REGION-locale-VERSION
  // Example: FR-fr-3.7.0
  const parts = modelVersion.split('-')
  return parts[0] || 'FR'
}
