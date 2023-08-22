export function capitaliseString(stringToCapitalise?: string) {
	return (
		stringToCapitalise &&
		stringToCapitalise[0].toUpperCase() + stringToCapitalise.slice(1)
	)
}
