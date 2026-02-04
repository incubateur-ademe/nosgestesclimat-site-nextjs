// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { orderedCategories } from '@/constants/model/orderedCategories'
import { getComputedResults } from '@/publicodes-state/helpers/getComputedResults'
import { getSubcategories } from '@/publicodes-state/helpers/getSubcategories'
import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import type { ComputedResults } from '@/publicodes-state/types'
import type { DottedName, NGCRules, Persona } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import personas from '@incubateur-ademe/nosgestesclimat/public/personas-fr.json'
import Engine from 'publicodes'

import CategoriesAccordionStandalone from './CategoriesAccordionStandalone'

// Type for personas record
type PersonasRecord = Record<string, Persona>

// Available personas for the story (using actual persona names from the data)
const AVAILABLE_PERSONAS = {
  'personas . marie': 'Marie (faible empreinte)',
  'personas . corentin': 'Corentin (moyenne empreinte)',
  'personas . gerard': 'Gérard (forte empreinte)',
} as const

type PersonaKey = keyof typeof AVAILABLE_PERSONAS

// Function to create a fresh engine with a persona's situation
function createEngineWithPersona(personaKey: string) {
  const typedPersonas = personas as PersonasRecord
  const persona = typedPersonas[personaKey]

  if (!persona?.situation) {
    throw new Error(`Persona ${personaKey} not found or has no situation`)
  }

  const freshEngine = new Engine<DottedName>(rules as Partial<NGCRules>, {
    logger: { warn: () => {}, error: () => {}, log: () => {} },
    strict: {
      situation: false,
      noOrphanRule: false,
    },
  })

  freshEngine.setSituation(persona.situation)

  return freshEngine
}

// Function to compute results for a given persona
function getComputedResultsForPersona(personaKey: string): ComputedResults {
  const engine = createEngineWithPersona(personaKey)

  const everyRules = Object.keys(rules).map(
    (dottedName) => dottedName as DottedName
  )

  return getComputedResults({
    metrics: ['carbone', 'eau'],
    categories: orderedCategories,
    subcategories: getSubcategories({
      categories: orderedCategories,
      everyRules,
      parsedRules: engine.getParsedRules(),
      safeGetRule: (dottedName) =>
        safeGetRuleHelper(dottedName, engine) ?? undefined,
    }),
    getNumericValue: (dottedName) =>
      engine.evaluate(dottedName).nodeValue as number,
  })
}

// Wrapper component to handle persona selection state
function CategoriesAccordionWithSelector({
  initialPersona = 'personas . marie',
}: {
  initialPersona?: PersonaKey
}) {
  const [selectedPersona, setSelectedPersona] =
    useState<PersonaKey>(initialPersona)
  const [computedResults, setComputedResults] = useState<ComputedResults>(() =>
    getComputedResultsForPersona(selectedPersona)
  )

  const handlePersonaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPersona = event.target.value as PersonaKey
    setSelectedPersona(newPersona)
    setComputedResults(getComputedResultsForPersona(newPersona))
  }

  return (
    <div className="w-full">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label
          htmlFor="persona-selector"
          className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner un persona :
        </label>
        <select
          id="persona-selector"
          value={selectedPersona}
          onChange={handlePersonaChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border">
          {Object.entries(AVAILABLE_PERSONAS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-gray-500">
          Total:{' '}
          <strong>
            {Math.round(computedResults.carbone?.bilan / 1000)} tonnes CO₂e
          </strong>
        </p>
      </div>

      <CategoriesAccordionStandalone
        key={computedResults.carbone?.bilan}
        rules={rules as Partial<NGCRules>}
        computedResults={computedResults}
        metric="carbone"
      />
    </div>
  )
}

const meta: Meta<typeof CategoriesAccordionWithSelector> = {
  title: 'Components/Results/CategoriesAccordionStandalone',
  component: CategoriesAccordionWithSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialPersona: {
      control: 'select',
      options: Object.keys(AVAILABLE_PERSONAS),
      description: 'Persona initial à afficher',
      mapping: Object.fromEntries(
        Object.keys(AVAILABLE_PERSONAS).map((key) => [key, key])
      ),
    },
  },
}

export default meta
type Story = StoryObj<typeof CategoriesAccordionWithSelector>

export const Default: Story = {
  args: {
    initialPersona: 'personas . marie',
  },
}

export const MediumFootprint: Story = {
  args: {
    initialPersona: 'personas . corentin',
  },
}

export const HighFootprint: Story = {
  args: {
    initialPersona: 'personas . gerard',
  },
}
