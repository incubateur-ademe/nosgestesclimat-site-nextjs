export const getIsUserVerified = () => {
  if (typeof window === 'undefined') return false

  // Try getting ngcjwt cookie client side
  const ngcjwt = document.cookie
    .split('; ')
    .some((row) => row.startsWith('ngcjwt='))

  if (!ngcjwt) return false

  return true
}
