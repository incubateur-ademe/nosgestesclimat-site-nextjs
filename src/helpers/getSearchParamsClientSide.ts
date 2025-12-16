/**
 * Get URLSearchParams from the client-side window location search.
 * Returns an empty string if window is undefined (server-side).
 */
export function getSearchParamsClientSide() {
  return new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  )
}
