'use client'

import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useEngine } from '@/publicodes-state'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import Image from 'next/image'
import { useState } from 'react'
import ActionList from './_components/ActionList'

type Props = {
  actions: any
  rules: any
  radical: boolean
}

export default function Actions({
  actions: rawActions,
  radical,
  rules,
}: Props) {
  const [focusedAction, setFocusedAction] = useState<string>('')

  const { t } = useClientTranslation()
  const { getValue } = useEngine()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const thresholds = [
    [10000, t('plus de 10 tonnes')],
    [1000, t("plus d'1 tonne")],
    [100, t('plus de 100 kg')],
    [10, t('plus de 10 kg')],
    [1, t("plus d'1 kg")],
  ]

  const { actionChoices } = useCurrentSimulation()

  const actions = rawActions.map((a: any) => ({
    ...a,
    value: getCorrectedValue({
      nodeValue: a.nodeValue,
      unit: a.unit,
    }),
  }))

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
          focusedAction={focusedAction}
          setFocusedAction={setFocusedAction}
        />

        <div className="my-4 h-8 w-full text-center">
          <p className="inline-block rounded-md bg-primary-700 px-4 py-1 text-sm font-medium text-white ">
            <span>{label} &#9650;</span>
          </p>
        </div>
      </div>
    )
  })

  return (
    <>
      {maxImpactAction.value < 100 && (
        <Card className="my-8">
          <Trans i18nKey={'publicodes.AllActions.msgPlusActions'}>
            <p>
              Nous n'avons plus d'actions chiffrées très impactantes à vous
              proposer 🤷
            </p>
            <p className="mb-0">
              Découvrez plus bas quelques pistes pour agir autrement ⏬
            </p>
          </Trans>
        </Card>
      )}

      {radical ? numberedActions : numberedActions.slice().reverse()}

      <div className="my-4 h-8 w-full text-center">
        <p className="inline-flex items-center rounded-full bg-primary-700 px-4 text-sm font-medium  text-white">
          <Image
            src="/images/misc/270A.svg"
            className="mr-2 align-middle invert "
            height={36}
            width={36}
            alt=""
          />
          <Trans>Actions d'engagement</Trans> &#9660;
        </p>
      </div>

      <ActionList
        actions={notRejected.filter(
          (a: { value: any }) => a.value === undefined
        )}
        rules={rules}
        bilan={bilan}
        setFocusedAction={setFocusedAction}
        focusedAction={focusedAction}
      />

      <div className="my-4 h-8 w-full text-center">
        <p className="inline-flex items-center rounded-full bg-primary-700 px-4 text-sm  font-medium text-white ">
          <Image
            src="/images/misc/26D4.svg"
            className="mr-2 invert"
            height={36}
            width={36}
            alt=""
          />
          <Trans>Actions négatives</Trans> &#9660;
        </p>
      </div>

      <ActionList
        actions={notRejected.filter((a: { value: any }) => a.value < 0)}
        rules={rules}
        bilan={bilan}
        setFocusedAction={setFocusedAction}
        focusedAction={focusedAction}
      />

      {rejected.length > 0 && (
        <div>
          <h2>
            <Trans>Actions écartées :</Trans>
          </h2>
          <ActionList
            actions={rejected}
            rules={rules}
            bilan={bilan}
            setFocusedAction={setFocusedAction}
            focusedAction={focusedAction}
          />
        </div>
      )}
    </>
  )
}
