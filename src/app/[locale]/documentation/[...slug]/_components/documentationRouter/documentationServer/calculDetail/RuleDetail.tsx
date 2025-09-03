import Link from '@/components/Link'
import { KEYS_TO_OMIT, RULES_TO_HIDE } from '@/constants/documentation'
import { capitalizeString } from '@/utils/capitalizeString'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import type {
  DottedName,
  NGCRule,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'

const getRuleFormatted = (rule: NGCRule): NGCRule => {
  const ruleFormatted = { ...rule }

  for (const key in ruleFormatted) {
    if (KEYS_TO_OMIT.indexOf(key) >= 0) {
      delete ruleFormatted[key as keyof typeof ruleFormatted]
    }
  }

  return ruleFormatted
}

export default function RuleDetail({
  ruleData,
  context,
}: {
  ruleData: NGCRule | string | number
  context: {
    dottedName: DottedName
    rules: NGCRules
  }
}) {
  const isDataObject =
    typeof ruleData !== 'string' && typeof ruleData !== 'number'

  const ruleFormatted = isDataObject ? getRuleFormatted(ruleData) : ruleData

  const isArray =
    ruleData &&
    isDataObject &&
    Object.keys(ruleData).every((key) => Number.isInteger(+key))

  if (ruleFormatted === null) {
    return
  }

  if (typeof ruleFormatted === 'string') {
    try {
      if (!context) return <span>{capitalizeString(ruleFormatted)}</span>

      const ruleString = utils.disambiguateReference(
        // Should be ParsedRules but not available from server side.
        context.rules as any,
        context.dottedName,
        ruleFormatted
      )

      return (
        <Link href={`/documentation/${encodeRuleName(String(ruleString))}`}>
          {capitalizeString(ruleFormatted)}
        </Link>
      )
    } catch (e) {
      return <span>{capitalizeString(ruleFormatted)}</span>
    }
  }

  if (typeof ruleFormatted === 'number') {
    if (RULES_TO_HIDE.has(context.dottedName)) {
      return <span>masquée par l'intégrateur</span>
    } else {
      return <span>{ruleFormatted}</span>
    }
  }

  if (isArray) {
    return (
      <ul className="list-disc pl-8">
        {Object.entries(ruleFormatted).map(([key, value]: [string, any]) => {
          return (
            <li key={key}>
              <RuleDetail ruleData={value as any} context={context} />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className="mb-0 list-none">
      {Object.entries(ruleFormatted).map(([key, value]: [string, any]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return (
            <li key={key} className="list-disc">
              <span className="ml-4">
                <RuleDetail ruleData={value} context={context} />
              </span>
            </li>
          )
        }

        return (
          <li key={key}>
            <div>{capitalizeString(key)}:</div>
            <div className="ml-4">
              <RuleDetail ruleData={value as any} context={context} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
