import { isIPv4 } from 'node:net'
import { EntityNotFoundException } from '../../core/errors/EntityNotFoundException.ts'
import { findCountry } from './geolocation.repository.ts'

export const getModeleCountry = (ip?: string) => {
  if (!isIPv4(ip)) {
    // `request-ip` retombe sur l'adresse de la socket : `ip` n'est jamais vide,
    // donc ce cas est un visiteur en IPv6 (ou une adresse non routable).
    throw new EntityNotFoundException('ip v4 required')
  }

  const country = findCountry(ip)

  if (!country) {
    throw new EntityNotFoundException('could not determine ip country')
  }

  return country
}
