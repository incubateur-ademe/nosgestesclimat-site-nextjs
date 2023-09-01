'use client'

import imageSrc2 from '@/assets/images/26D4.svg'
import imageSrc from '@/assets/images/270A.svg'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { FromTop } from '@/design-system/utils/Animate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useUser } from '@/publicodes-state'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import Image from 'next/image'
import { useState } from 'react'
import ActionsOptionsBar from '../OptionsBar'
import ActionList from './_components/ActionList'

type Props = {
  actions: any
  rules: any
}

export default function Actions({
  actions: rawActions,

  rules,
}: Props) {
  const { t } = useClientTranslation()

  const [radical, setRadical] = useState(true)
  const [focusedAction, focusAction] = useState('')

  const { getValue } = useEngine()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const thresholds = [
    [10000, t('plus de 10 tonnes')],
    [1000, t("plus d'1 tonne")],
    [100, t('plus de 100 kg')],
    [10, t('plus de 10 kg')],
    [1, t("plus d'1 kg")],
  ]

  const actions = rawActions.map((a: any) => ({
    ...a,
    value: getCorrectedValue({
      nodeValue: a.nodeValue,
      unit: a.unit,
    }),
  }))

  const userObject = useUser()

  const { actionChoices } = userObject.getCurrentSimulation()

  const rejected = actions.filter(
    (a: any) => actionChoices?.[a.dottedName] === false
  )

  const notRejected = actions.filter(
    (a: any) => actionChoices?.[a.dottedName] !== false
  )

  const maxImpactAction = notRejected.reduce(
    (acc: any, next: any) => {
      return next.value > acc.value ? next : acc
    },
    { value: 0 } as { value: number }
  )

  const numberedActions = thresholds.map(([threshold, label], index) => {
    const thresholdActions = notRejected.filter(
      (a: { value: any }) =>
        a.value >= threshold &&
        (index === 0 || a.value < thresholds[index - 1][0])
    )

    if (!thresholdActions.length) return null

    return (
      <div key={label}>
        <ActionList
          actions={thresholdActions}
          rules={rules}
          bilan={bilan}
          focusAction={focusAction}
          focusedAction={focusedAction}
        />

        <div className="my-4 h-8 w-full text-center">
          <p className="inline-block rounded-md bg-primaryDark px-4 py-1 text-sm font-medium text-white ">
            <span>{label} &#9650;</span>
          </p>
        </div>
      </div>
    )
  })

  return (
    <div>
      <ActionsOptionsBar
        setRadical={setRadical}
        radical={radical}
        actions={rawActions}
      />
      {maxImpactAction.value < 100 && (
        <FromTop>
          <Card className="ui__ card box">
            <TransClient i18nKey={'publicodes.AllActions.msgPlusActions'}>
              <p>
                Nous n'avons plus d'actions chiffrées très impactantes à vous
                proposer 🤷
              </p>
              <p>Découvrez plus bas quelques pistes pour agir autrement ⏬</p>
            </TransClient>
          </Card>
        </FromTop>
      )}

      {radical ? numberedActions : numberedActions.slice().reverse()}

      <div className="my-4 h-8 w-full text-center">
        <p className="inline-flex items-center rounded-full bg-primaryDark px-4 text-sm font-medium  text-white">
          <Image
            src={imageSrc}
            className="mr-2 align-middle invert "
            height={36}
            width={36}
            alt=""
          />
          <TransClient>Actions d'engagement</TransClient> &#9660;
        </p>
      </div>
      <ActionList
        actions={notRejected.filter(
          (a: { value: any }) => a.value === undefined
        )}
        rules={rules}
        bilan={bilan}
        focusAction={focusAction}
        focusedAction={focusedAction}
      />
      <div className="my-4 h-8 w-full text-center">
        <p className="inline-flex items-center rounded-full bg-primaryDark px-4 text-sm  font-medium text-white ">
          <Image
            src={imageSrc2}
            className="mr-2 invert"
            height={36}
            width={36}
            alt=""
          />
          <TransClient>Actions négatives</TransClient> &#9660;
        </p>
      </div>

      <ActionList
        actions={notRejected.filter((a: { value: any }) => a.value < 0)}
        rules={rules}
        bilan={bilan}
        focusAction={focusAction}
        focusedAction={focusedAction}
      />
      {rejected.length > 0 && (
        <div>
          <h2>
            <TransClient>Actions écartées :</TransClient>
          </h2>
          <ActionList
            actions={rejected}
            rules={rules}
            bilan={bilan}
            focusAction={focusAction}
            focusedAction={focusedAction}
          />
        </div>
      )}
      <ButtonLink href="/actions/plus">
        <span role="img" aria-label="emoji books" aria-hidden>
          📚
        </span>
        <div>
          <TransClient i18nKey={'publicodes.AllActions.allerPlusLoin'}>
            <h2>Aller plus loin</h2>
            <p>
              <small>
                Au-delà d'un simple chiffre, découvrez les enjeux qui se cachent
                derrière chaque action.
              </small>
            </p>
          </TransClient>
        </div>
      </ButtonLink>
    </div>
  )
}
