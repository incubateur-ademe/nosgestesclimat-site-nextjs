import Link from '@/components/Link'
import { capitalizeString } from '@/utils/capitalizeString'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import type {
  DottedName,
  NGCRule,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'

const KEYS_TO_OMIT = [
  'titre',
  'couleur',
  'abréviation',
  'icônes',
  'description',
  'résumé',
  'exposé',
  'unité',
  'question',
  'note',
  'références',
  // specific to NGC actions
  'effort',
  'inactive',
  // specific to NGC form generation, could be cool to visualize, but in a <details> tag, since it's big
  'mosaique',
]

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
    return <span>{ruleFormatted}</span>
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
