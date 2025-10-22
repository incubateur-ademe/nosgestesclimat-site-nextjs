import type { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * List of iframe-related parameters that should be preserved across navigation
 */
export const IFRAME_PARAMS = [
  'iframe',
  'shareData',
  'onlySimulation',
  'region',
  'lang',
  'integratorUrl',
  'PR',
] as const

/**
 * Preserves iframe-related parameters from current searchParams when building new URLs
 * @param currentSearchParams - Current URL search parameters
 * @param newParams - New parameters to add/override
 * @returns URLSearchParams with preserved iframe params + new params
 */
export function preserveIframeParams(
  currentSearchParams: ReadonlyURLSearchParams,
  newParams: Record<string, string | null | undefined> = {}
): URLSearchParams {
  const preservedParams = new URLSearchParams()

  // Preserve existing iframe params
  IFRAME_PARAMS.forEach((param) => {
    const value = currentSearchParams.get(param)
    if (value) {
      preservedParams.set(param, value)
    }
  })

  // Add/override with new params
  Object.entries(newParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      preservedParams.set(key, value)
    }
  })

  return preservedParams
}

/**
 * Helper to build a URL with preserved iframe params
 * @param pathname - The pathname for the URL
 * @param currentSearchParams - Current URL search parameters
 * @param newParams - New parameters to add/override
 * @returns Complete URL string
 */
export function buildUrlWithPreservedParams(
  pathname: string,
  currentSearchParams: ReadonlyURLSearchParams,
  newParams: Record<string, string | null | undefined> = {}
): string {
  const searchParams = preserveIframeParams(currentSearchParams, newParams)
  const searchString = searchParams.toString()

  return searchString ? `${pathname}?${searchString}` : pathname
}
