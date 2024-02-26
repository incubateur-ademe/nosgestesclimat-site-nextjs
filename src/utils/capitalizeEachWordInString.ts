import { capitalizeString } from './capitalizeString'

export function capitalizeEachWordInString(stringToCapitalise?: string) {
  return stringToCapitalise
    ?.split(' ')
    .map((word) => capitalizeString(word))
    .join(' ')
}
