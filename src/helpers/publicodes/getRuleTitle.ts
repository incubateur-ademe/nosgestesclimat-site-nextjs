export const getRuleTitle = (rule: {
	plus: string
	titre?: string
	dottedName: string
}) =>
	rule.titre ??
	rule.dottedName.split(' . ')[rule.dottedName.split(' . ').length - 1]
