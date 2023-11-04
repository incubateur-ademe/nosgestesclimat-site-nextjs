import { NGC_MODEL_API_URL } from '@/constants/urls'

export const handleFetchDocumentation = fetch(
  NGC_MODEL_API_URL + '/contenu-ecrit.json',
  {
    mode: 'cors',
  }
)
  .then((response) => response.json())
  .then((json) => {
    return json
  })
