import Card from '@/design-system/layout/Card'
import { Rules } from '@/publicodes-state/types'
import { Rule } from 'publicodes'
import RuleDetail from './calculDetail/RuleDetail'

export default function CalculDetail({
  rule,
  ruleName,
  rules,
}: {
  rule: Rule
  ruleName: string
  rules: Rules
}) {
  return (
    <>
      <h2>
        <NGCTrans>Comment cette donnée est-elle calculée ?</NGCTrans>
      </h2>

      <Card className="p-8">
        <RuleDetail ruleData={rule} context={{ dottedName: ruleName, rules }} />
      </Card>
    </>
  )
}
