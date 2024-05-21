import { Situation } from '@/publicodes-state/types'

export function unformatSituation(situation?: Situation) {
  return Object.entries({ ...situation }).reduce(
    (acc: Situation, [key, value]: [string, any]) => {
      // Key is not formatted
      if (!key.includes('_')) {
        acc[key] = value
        return acc
      }

      let unformattedKey = key.replaceAll('_', ' . ').replaceAll('-', ' ')

      const wordsToHardcode = {
        't shirt': 't-shirt',
        'sèche linge': 'sèche-linge',
        'lave linge': 'lave-linge',
        'lave vaisselle': 'lave-vaisselle',
        'micro onde': 'micro-onde',
        'éco construit': 'éco-construit',
      }

      for (const [keyToHardcode, valueToHardcode] of Object.entries(
        wordsToHardcode
      )) {
        if (unformattedKey.includes(keyToHardcode)) {
          unformattedKey = unformattedKey.replace(
            keyToHardcode,
            valueToHardcode
          )
        }
      }

      acc[unformattedKey] = value

      return acc
    },
    {}
  )
}
