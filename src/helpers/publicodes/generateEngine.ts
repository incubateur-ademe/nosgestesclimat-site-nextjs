import { NGCEngine } from '@/publicodes-state/types'
import { NGCRulesNodes } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'

export function generateEngine(
  rules: NGCRulesNodes,
  options: any = {
    logger: {
      log: console.log,
      warn: () => null,
      error: console.error,
    },
    allowOrphanRules: true,
  }
): NGCEngine {
  const engine = new Engine(rules, options) as NGCEngine

  return engine
}
