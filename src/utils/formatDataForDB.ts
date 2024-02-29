import { Situation } from '@/publicodes-state/types'

type SituationFormated = {
  [key: string]: any
}

/**
 * Formats the simulation data, removing the ' . ' from the keys
 * @param situation
 * @returns SituationFormated
 */
export const formatSituation = (situation: Situation): SituationFormated => {
  return Object.entries({ ...situation } as { [key: string]: any }).reduce(
    (acc: { [key: string]: any }, [key, value]: [string, any]) => {
      acc[key.replaceAll(' . ', '_').replaceAll(' ', '-')] = value
      return acc
    },
    {}
  )
}

export const unformatSituation = (situation: SituationFormated): Situation => {
  return Object.entries({ ...situation } as { [key: string]: any }).reduce(
    (acc: { [key: string]: any }, [key, value]: [string, any]) => {
      acc[key.replaceAll('_', ' . ').replaceAll('-', ' ')] = value
      return acc
    },
    {}
  )
}
