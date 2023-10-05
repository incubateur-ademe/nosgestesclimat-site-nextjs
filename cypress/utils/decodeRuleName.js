export function decodeRuleName(ruleName) {
  return decodeURI(ruleName)
    ?.replace('/', ' . ')
    .replace('\u2011', '-') // replace with a insecable tiret to differenciate from space
    .replace('-', ' ')
}
