import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { DottedName, Rules } from '@/publicodes-state/types'
import { Rule } from 'publicodes'
import RuleDetail from './calculDetail/RuleDetail'

export default function CalculDetail({
  rule,
  ruleName,
  rules,
}: {
  rule: Rule
  ruleName: DottedName
  rules: Rules
}) {
  return (
    <>
      <h2>
        <Trans>Comment cette donnée est-elle calculée ?</Trans>
      </h2>

      <Card className="p-8">
        <RuleDetail ruleData={rule} context={{ dottedName: ruleName, rules }} />
      </Card>
    </>
  )
}
