import type { ReadonlyURLSearchParams } from 'next/navigation'

export function appendSearchParams(
  urlOrPathname: string,
  searchParams: ReadonlyURLSearchParams | URLSearchParams | undefined
): string {
  if (typeof searchParams === 'undefined') return urlOrPathname

  const urlSearchParams = new URLSearchParams()

  for (const [key, value] of searchParams.entries()) {
    if (Array.isArray(value)) {
      value.forEach((singleValue: string) => {
        if (!singleValue) return
        urlSearchParams.append(key, singleValue)
      })
    } else if (typeof value !== 'undefined') {
      urlSearchParams.append(key, value)
    }
  }

  return `${urlOrPathname}?${urlSearchParams.toString()}`
}
