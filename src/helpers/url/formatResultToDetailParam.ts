export function formatResultToDetailParam({
  categories,
  getValue,
}: {
  categories: string[]
  getValue: (dottedName: string) => number
}): string {
  const fullDetailString = categories.reduce((detailString, category) => {
    const value = getValue(category)

    return `${detailString}${category[0]}${(
      Math.round(value ?? 0 / 10) / 100
    ).toFixed(2)}`
  }, '')

  return `https://nosgestesclimat.fr/fin?detail=${fullDetailString}`
}
