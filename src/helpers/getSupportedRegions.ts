//TODO: should check if PR is in query params but it is kind of difficult to do in a server component

import { SuppportedRegions } from '@/types/international'

export const getSupportedRegions = async (): Promise<SuppportedRegions> => {
  return fetch(
    `https://deploy-preview-2108--ecolab-data.netlify.app/supportedRegions.json`
  ).then((response) => {
    return response.json()
  })
}
