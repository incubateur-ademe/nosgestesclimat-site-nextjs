import { Category } from '@/types/model'
import StepsTable from './StepTable'
import SubCategory from './SubCategory'

type Props = {
  rules: Category[]
  level: number
}

export default function RecursiveStepsTable({ rules, level }: Props) {
  const rulesByParents = rules.reduce(
    (parentRulesObject, nextRule) => {
      const modifiedParentRulesObject = { ...parentRulesObject }
      const splitedDottedName = nextRule.dottedName.split(' . ')

      const parentRule = splitedDottedName.slice(0, level + 1).join(' . ')

      const currentChildRulesArray = modifiedParentRulesObject[parentRule] ?? []

      const updatedChildRulesArray = currentChildRulesArray.some(
        ({ dottedName }) => dottedName === nextRule.dottedName
      )
        ? currentChildRulesArray
        : [...currentChildRulesArray, nextRule]

      return {
        ...modifiedParentRulesObject,
        [parentRule]: updatedChildRulesArray,
      }
    },
    {} as { [key: string]: Category[] }
  )

  const lonelyRules = Object.values(rulesByParents)
    .map((els) => (els.length === 1 ? els : []))
    .flat()

  return (
    <div className="pl-4  border-solid border-0 border-l-2 border-grey-200">
      {Object.entries(rulesByParents).map(([key, values]) => {
        return (
          values.length > 1 ?? (
            <SubCategory
              key={key}
              rules={values}
              ruleDottedName={key}
              level={level + 1}
            />
          )
        )
      })}

      <StepsTable rules={lonelyRules} level={level} />
    </div>
  )
}
