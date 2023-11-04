//TODO: should check if PR is in query params but it is kind of difficult to do in a server component

import { NGC_MODEL_API_URL } from '@/constants/urls'

export const getSupportedRegions = () =>
  fetch(`${NGC_MODEL_API_URL}/supportedRegions.json`).then((response) =>
    response.json()
  )
