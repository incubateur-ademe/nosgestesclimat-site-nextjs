export const fetchSupportedRegions = fetch(
	'https://data.nosgestesclimat.fr/supportedRegions.json'
).then((response) => response.json())
