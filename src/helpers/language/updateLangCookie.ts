export function updateLangCookie(locale: string) {
  const maxAge = 31536000
  // const domain = window.location.hostname.includes('nosgestesclimat.fr')
  //   ? '.nosgestesclimat.fr'
  //   : `.${window.location.hostname}`

  document.cookie = `NEXT_LOCALE=${locale};max-age=${maxAge}; path=/; SameSite=Lax; Secure`
}
