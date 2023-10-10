export const handleFetchDocumentation = fetch(
  'https://deploy-preview-2085--ecolab-data.netlify.app/contenu-ecrit.json',
  {
    mode: 'cors',
  }
)
  .then((response) => response.json())
  .then((json) => {
    return json
  })
