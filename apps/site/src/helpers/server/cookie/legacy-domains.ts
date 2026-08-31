export function getLegacyCookieDomains(hostname: string): string[] {
  if (hostname === 'nosgestesclimat.fr') {
    return [hostname]
  }
  if (hostname.endsWith('.nosgestesclimat.fr')) {
    return [hostname, 'nosgestesclimat.fr']
  }
  return [hostname]
}
