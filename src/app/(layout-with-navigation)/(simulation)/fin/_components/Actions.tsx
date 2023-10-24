import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useActions, useEngine } from '@/publicodes-state'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Action from './actions/Action'

export default function Actions() {
  const { t } = useTranslation()
  const { orderedActions } = useActions()
  const { getCategory } = useEngine()

  const filteredSameCategoriesActions = useMemo(
    () =>
      orderedActions.reduce(
        (accumulator: string[], currentValue: string) =>
          accumulator.find(
            (action) => getCategory(action) === getCategory(currentValue)
          )
            ? accumulator
            : [...accumulator, currentValue],
        []
      ),
    [orderedActions, getCategory]
  )

  return (
    <div>
      <div id="shareImage">
        <h3 className="mb-2 text-center text-lg md:mb-4 md:text-xl">
          {t('Comment réduire mon empreinte\u202f?')}
        </h3>

        <p className="text-center text-sm italic md:text-base">
          {t('Les 3 actions au plus fort impact pour vous\u202f:')}
        </p>

        <div className="mb-4 flex flex-col gap-4">
          {filteredSameCategoriesActions.map((action, index) =>
            index < 3 ? <Action key={action} action={action} /> : null
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <ButtonLink href="/actions" size="lg">
          Voir toutes les actions
        </ButtonLink>
      </div>
    </div>
  )
}
