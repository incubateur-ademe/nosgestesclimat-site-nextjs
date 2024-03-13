export function rehydrateDetail(detail: string) {
  return detail.match(/[a-z][0-9]+\.[0-9][0-9]/g)?.reduce(
    (acc, [category, ...rest]) => {
      return {
        ...acc,
        [category === 'b' ? 'd' : category]: 1000 * +rest.join(''),
      }
    },
    {} as Record<string, number>
  )
}
