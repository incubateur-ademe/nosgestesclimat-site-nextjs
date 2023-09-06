import { EvaluatedNode, Evaluation, RuleNode, Unit } from 'publicodes'

//--- Publicodes types

export type MissingVariables = Record<string, number>

export type EvaluationDecoration = {
  nodeValue: Evaluation<number>
  unit?: Unit
  traversedVariables?: Array<string>
  missingVariables: MissingVariables
}

//---- Extends publicodes types to handle Nos Gestes Climat (NGC) model rules.

export type Color = `#${string}`

export type SuggestionsNode = Record<
  string,
  string | number | Record<string, string | number>
>

/** Represents a rule name, i.e. root key in the raw parsed YAML. */
export type DottedName = string

/**
 * The NGC specific mosaique mechanism.
 *
 * @see https://github.com/datagir/nosgestesclimat-site/wiki/mosaic
 */
export type MosaiqueNode = {
  type: 'selection' | 'nombre'
  clé: string
  total?: number
  suggestions?: SuggestionsNode
}

export type MosaicInfos = {
  mosaicRule: RuleNode
  mosaicParams: MosaiqueNode
  mosaicDottedNames: [string, NGCRuleNode][]
}

/**
 * Extends publicodes Rule type with NGC specific properties.
 *
 * @note It aims to be isomorphic with the specified YAML model, i.e. their properties
 * should be the same, there is no specific transformation (apart from casting
 * to TypeScript types).
 * It represents a rule before parsing, i.e. before being returned by the engine.
 *
 * @see https://github.com/betagouv/publicodes/blob/5a1ba0f09e4b7949ce51b48eabae58b8b606c4b5/packages/core/source/rule.ts#L18-L42
 */
export type NGCRule = {
  abréviation?: string
  couleur?: Color
  mosaique?: MosaiqueNode
  type?: 'notification'
  sévérité?: 'avertissement' | 'information' | 'invalide'
  action?: { dépasse: DottedName[] }
  icônes?: string[]
  dottedName?: string
  // NOTE(@EmileRolley): used in Action.tsx but I don't if it is really needed..
  plus?: boolean
  formule?: Record<string, any>
}

/**
 * Extends publicodes RuleNode type with NGC specific properties.
 *
 * @note It represents a node returned after parsing, i.e. returned by the engine.
 */
export type NGCRuleNode = Omit<RuleNode<DottedName>, 'rawNode'> & {
  rawNode: NGCRule
}

/**
 * Root of a parsed NGC model.
 *
 * It basically maps a rule name to its parsed rule.
 */
export type NGCRulesNodes = Record<DottedName, NGCRuleNode>

/**
 * Root of a non-parsed NGC model.
 *
 * @note It is the same as NGCRulesNodes, but with the raw rule instead of the parsed one.
 * It is used to represent the model before parsing.
 *
 * @important YAML parsed object casted is casted in the NGCRules type, so
 * there is no guarantee that the data corresponds.
 * The implicit assumption here, is that the YAML model is isomorphic with the NGCRules type.
 */
export type NGCRules = Record<DottedName, NGCRule>

export type NGCEvaluatedRuleNode = NGCRuleNode & EvaluationDecoration

export type Category = EvaluatedNode<number> & {
  dottedName: DottedName
  title: string
  name: string
  rawNode: NGCRuleNode
  documentationDottedName: DottedName
  icons?: string[]
  color?: Color
  abbreviation: string
}
