import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import {
  DottedName,
  NGCRule,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import RuleDetail from './calculDetail/RuleDetail'

export default function CalculDetail({
  rule,
  ruleName,
  rules,
}: {
  rule: NGCRule
  ruleName: DottedName
  rules: NGCRules
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
