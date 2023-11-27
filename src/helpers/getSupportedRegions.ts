//TODO: should check if PR is in query params but it is kind of difficult to do in a server component

import { DEFAULT_MODEL_VERSION } from '@/constants/modelAPI'
import { NGC_MODEL_API_URL } from '@/constants/urls'
import { SuppportedRegions } from '@/types/international'

export const getSupportedRegions = async (): Promise<SuppportedRegions> => {
  return fetch(`${NGC_MODEL_API_URL}/${DEFAULT_MODEL_VERSION}`).then(
    (response) => {
      return response.json()
    }
  )
}
