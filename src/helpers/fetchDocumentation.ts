export const handleFetchDocumentation = fetch(
  'https://data.nosgestesclimat.fr/contenu-ecrit.json',
  {
    mode: 'cors',
  }
)
  .then((response) => response.json())
  .then((json) => {
    return json
  })
