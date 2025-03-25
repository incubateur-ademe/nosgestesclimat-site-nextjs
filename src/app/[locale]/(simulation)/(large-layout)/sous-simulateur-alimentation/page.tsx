'use client'

import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import ChoiceInput from '@/components/misc/ChoiceInput'
import Button from '@/design-system/inputs/Button'
import { useRules } from '@/hooks/useRules'
import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json'
import { FormBuilder } from '@publicodes/forms'
import Engine, { formatValue } from 'publicodes'
import { useState } from 'react'
import { groupByNamespace } from './_helper/groupByNamespace'

// Initialiser le moteur Publicodes
const engine = new Engine(rules as unknown as NGCRules, {
  strict: {
    noOrphanRule: true,
    checkPossibleValues: true,
    noCycleRuntime: false,
  },
  flag: {
    filterNotApplicablePossibilities: true,
  },
})
// La règle cible pour le calcul
const TARGET = 'alimentation'
// Form Builder pour gérer le formulaire
const formBuilder = new FormBuilder({ engine, pageBuilder: groupByNamespace })
// Initialiser l'état du formulaire
const initialState = formBuilder.start(FormBuilder.newState(), TARGET)

export default function SousSimulateurPage() {
  const { data: rules } = useRules({ isOptim: false })
  const [formState, setFormState] = useState(initialState)

  const handleChange = (id: string, value: number | string | boolean) => {
    const newState = formBuilder.handleInputChange(
      formState,
      id as DottedName,
      value
    )
    setFormState(newState)
  }

  const goToNextPage = () => setFormState(formBuilder.goToNextPage(formState))

  const goToPreviousPage = () =>
    setFormState(formBuilder.goToPreviousPage(formState))

  const { current, pageCount, hasNextPage, hasPreviousPage } =
    formBuilder.pagination(formState)

  if (!rules) return <p>Chargement du modèle...</p>

  return (
    <>
      <h1>Sous Simulateur "Alimentation"</h1>
      <h2>Questions</h2>
      <ul>
        {formBuilder.currentPage(formState).map((pageElement) => {
          console.log(pageElement)
          switch (pageElement.element) {
            case 'input':
              switch (pageElement.type) {
                case 'number':
                  return (
                    <>
                      <Label
                        question={pageElement.id as DottedName}
                        label={pageElement.label}
                        description={pageElement.description}
                      />
                      <NumberInput
                        className="my-2"
                        key={pageElement.id}
                        unit={pageElement.unit}
                        value={pageElement.value || pageElement.defaultValue}
                        setValue={() =>
                          handleChange(
                            pageElement.id,
                            pageElement.value as number
                          )
                        }
                        isMissing={pageElement.value ? false : true}
                        // min={pageElement.minValue ?? 0}
                      />
                    </>
                  )
                default:
                  return null
              }
            case 'RadioGroup':
              return (
                <>
                  <Label
                    question={pageElement.id as DottedName}
                    label={pageElement.label}
                    description={pageElement.description}
                  />

                  <fieldset className="flex flex-col gap-2">
                    <legend className="sr-only">{pageElement.label}</legend>
                    {pageElement.options &&
                      pageElement.options.map((option) =>
                        option ? (
                          <ChoiceInput
                            key={option.label}
                            label={option.label}
                            active={
                              pageElement.value !== undefined
                                ? pageElement.value === option.value
                                : pageElement.defaultValue === option.value
                            }
                            description={option.description}
                            onClick={() =>
                              handleChange(pageElement.id, option.value)
                            }
                            id={pageElement.id}
                          />
                        ) : null
                      )}
                  </fieldset>
                </>
              )
            default:
              return null
          }
        })}
      </ul>
      <div className="my-4">
        <Button
          disabled={!hasPreviousPage}
          size="md"
          onClick={goToPreviousPage}>
          {'← ' + 'Précédent'}
        </Button>
        <span className="mx-4">
          {current} / {pageCount}
        </span>
        <Button
          disabled={!hasNextPage}
          size="md"
          data-cypress-id="next-question-button"
          onClick={goToNextPage}>
          {'Suivant' + ' →'}
        </Button>
      </div>
      <section>
        <h2>Résultat</h2>
        Empreinte Alimentation : {formatValue(engine.evaluate(TARGET))}
      </section>
    </>
  )
}
