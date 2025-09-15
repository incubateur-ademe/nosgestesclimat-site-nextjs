export function updateLangCookie(locale: string) {
  const maxAge = 31536000 // 1 an en secondes
  const domain = window.location.hostname.includes('nosgestesclimat.fr')
    ? '.nosgestesclimat.fr'
    : window.location.hostname

  document.cookie = `NEXT_LOCALE=${locale};max-age=${maxAge}; path=/; domain=${domain}; SameSite=None; Secure`
}
