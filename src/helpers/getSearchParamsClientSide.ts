import type { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * Get URLSearchParams from the client-side window location search.
 * Returns an empty string if window is undefined (server-side).
 *
 * @returns {ReadonlyURLSearchParams} The URLSearchParams object from window.location.search
 */
export function getSearchParamsClientSide(): ReadonlyURLSearchParams {
  return new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  ) as ReadonlyURLSearchParams
}

