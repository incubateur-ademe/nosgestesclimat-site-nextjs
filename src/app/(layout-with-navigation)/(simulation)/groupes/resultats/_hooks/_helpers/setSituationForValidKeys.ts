import { NGCRulesNodes } from '@/publicodes-state/types'
import { safeGetSituation } from '@/publicodes-state/useDisposableEngine'

import { Situation } from '@/types/simulation'
import Engine from 'publicodes'

type SetSituationForValidKeysProps = {
  engine: Engine
  situation: Situation
}

export const setSituationForValidKeys = ({
  engine,
  situation,
}: SetSituationForValidKeysProps) => {
  const rulesParsed = engine.getParsedRules() as NGCRulesNodes
  const validSituation = safeGetSituation({ situation, rules: rulesParsed })
  engine.setSituation(validSituation)
}
