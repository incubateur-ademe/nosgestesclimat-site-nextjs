import { isIPv4 } from 'node:net'
import { EntityNotFoundException } from '../../core/errors/EntityNotFoundException.ts'
import { findCountry } from './geolocation.repository.ts'

export const getModeleCountry = (ip?: string) => {
  // `request-ip` retombe sur l'adresse de la socket, donc ce cas est le plus
  // souvent un visiteur en IPv6 ; le `!ip` reste pour le typage, pas pour le réel.
  if (!ip || !isIPv4(ip)) {
    throw new EntityNotFoundException('ip v4 required')
  }

  const country = findCountry(ip)

  if (!country) {
    throw new EntityNotFoundException('could not determine ip country')
  }

  return country
}
