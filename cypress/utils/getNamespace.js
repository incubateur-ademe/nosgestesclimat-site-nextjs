export default function getNamespace(ruleName) {
  return !ruleName ? undefined : ruleName.split(' . ')[0]
}
