import { useRule } from '@/publicodes-state'
import AnwsersTable from './AnswersTable'
import RuleNode from './RuleNode'

type Props = {
  rules: string[]
  level: number
}

export default function RecursiveStepsTable({ rules, level }: Props) {
  const rulesByParents = rules.reduce(
    (parentRulesObject, nextRule) => {
      const modifiedParentRulesObject = { ...parentRulesObject }
      const splitedDottedName = nextRule.split(' . ')

      const parentRule = splitedDottedName.slice(0, level + 1).join(' . ')

      const currentChildRulesArray = modifiedParentRulesObject[parentRule] ?? []

      const updatedChildRulesArray = currentChildRulesArray.some(
        (dottedName) => dottedName === nextRule
      )
        ? currentChildRulesArray
        : [...currentChildRulesArray, nextRule]

      return {
        ...modifiedParentRulesObject,
        [parentRule]: updatedChildRulesArray,
      }
    },
    {} as { [key: string]: string[] }
  ) as { [key: string]: string[] }

  const lonelyRules = Object.values(rulesByParents)
    .map((ruleNames) => (ruleNames.length === 1 ? ruleNames : []))
    .flat()

  return (
    <div className="pl-4 pt-4 mb-4 border-dashed border-0 border-l border-grey-200">
      {Object.entries(rulesByParents)
        .map(([key, values]) => {
          if (values.length > 1) return [key, values]

          const rule = useRule(key)

          if (rule?.questionsOfMosaic && rule.questionsOfMosaic.length > 0) {
            return [key, rule.questionsOfMosaic as string[]]
          }

          return [key, values]
        })
        .filter(([key, values]) => values.length > 1)
        .map(([key, values]) => {
          return (
            <RuleNode
              key={key as string}
              rules={values as string[]}
              ruleDottedName={key as string}
              level={level + 1}
            />
          )
        })}

      <AnwsersTable rules={lonelyRules} level={level} />
    </div>
  )
}
