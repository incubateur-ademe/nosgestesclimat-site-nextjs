export function decodeRuleName(ruleName) {
  return decodeURI(ruleName)
    ?.replaceAll('/', ' . ')
    .replace('\u2011', '-') // replace with a insecable tiret to differenciate from space
    .replace('-', ' ')
}
