import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

const WORDS_WITH_DASH = {
  'chauffe eau': 'chauffe-eau',
}

export function decodeRuleNameFromPath(path: string): DottedName {
  let ruleName = decodeURI(path)
    ?.replaceAll('/', ' . ')
    .replaceAll('\u2011', '-') // replace with a insecable tiret to differenciate from space
    .replaceAll('-', ' ') as DottedName

  for (const [key, value] of Object.entries(WORDS_WITH_DASH)) {
    ruleName = ruleName.replace(key, value) as DottedName
  }

  return ruleName
}
