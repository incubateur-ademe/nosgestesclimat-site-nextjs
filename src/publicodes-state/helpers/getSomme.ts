import { NGCRule } from '@incubateur-ademe/nosgestesclimat'

/**
 * We use this hook to get the content of the [somme] of a rule.
 *
 * This is needed because in optimized rules, the syntaxic-sugar mechanism
 * [formule] is unfolded (i.e. replaced by its content). The [somme] is then
 * at the root of the rule and not in a [formule] mechanism (both syntaxes are valid).
 *
 * With the new `eau` metric, for some categories, the `somme` is not in the `formule` only but in a `variations` mechanism like:
 * 
[
    {
        "si": "métrique = 'carbone'",
        "alors": {
            "somme": [
                "repas",
                "boisson",
                "déchets"
            ]
        }
    },
    {
        "si": "métrique = 'eau'",
        "alors": {
            "somme": [
                "repas",
                "boisson"
            ]
        }
    }
]
 */

type subCatWithVariations = Array<{
  si: string
  alors: {
    somme: string[]
  }
}>

export default function getSomme(rawNode?: NGCRule): string[] | undefined {
  if (!rawNode) return undefined

  if ('formule' in rawNode) {
    rawNode.formule?.variations
      ? (rawNode.formule?.variations as subCatWithVariations)[0]?.alors?.somme
      : (rawNode.formule?.somme as string[])
  }

  if ('somme' in rawNode) {
    return rawNode.somme as string[]
  }

  if ('variations' in rawNode) {
    const variations = rawNode.variations as subCatWithVariations
    return variations[0].alors.somme
  }

  return undefined
}
