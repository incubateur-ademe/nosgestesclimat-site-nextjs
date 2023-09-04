// TODO: endpoint should not be static (and should point to local if available)
export const fetchSupportedRegions = fetch(
  'https://data.nosgestesclimat.fr/supportedRegions.json'
).then((response) => response.json())
