export function formatListIdsFromObject(object: Record<string, boolean>) {
  return Object.entries(object)
    .filter(([, value]) => value)
    .map(([key]) => Number(key))
}
