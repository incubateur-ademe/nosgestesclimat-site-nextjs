export function decodeRuleNameFromPath(path: string) {
  return decodeURI(path)
    ?.replaceAll('/', ' . ')
    .replaceAll('\u2011', '-') // replace with a insecable tiret to differenciate from space
    .replaceAll('-', ' ')
}
