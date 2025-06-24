'use client'

import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useEngine } from '@/publicodes-state'
import type { Action } from '@/publicodes-state/types'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Image from 'next/image'
import { useState } from 'react'
import ActionList from './actions/ActionList'

type Props = {
  actions: (Action & { isIrrelevant: boolean })[]
  rules: any
  radical: boolean
}

export default function Actions({
  actions: rawActions,
  radical,
  rules,
}: Props) {
  const [actionWithFormOpen, setActionWithFormOpen] = useState<string>('')

  const { t } = useClientTranslation()
  const { getValue } = useEngine()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const thresholds: [number, string][] = [
    [10000, t('plus de 10 tonnes')],
    [1000, t("plus d'1 tonne")],
    [100, t('plus de 100 kg')],
    [10, t('plus de 10 kg')],
    [1, t("plus d'1 kg")],
  ]

  const { actionChoices } = useCurrentSimulation()

  const actions = rawActions.map((action) => ({
    ...action,
    value: getCorrectedValue(action),
  })) as (Action & { isIrrelevant: boolean; value: number | undefined })[]

  const rejected = actions.filter(
    (action) => actionChoices?.[action.dottedName] === false
  )

  const notRejected = actions.filter(
    (action) => actionChoices?.[action.dottedName] !== false
  )

  const maxImpactAction = notRejected.reduce(
    (max, action) => ((action.value ?? 0) > (max.value ?? 0) ? action : max),
    {
      value: 0,
      dottedName: '' as DottedName,
      isIrrelevant: false,
    } as Action & { isIrrelevant: boolean; value: number | undefined }
  )

  const numberedActions = thresholds.map(([threshold, label], index) => {
    const thresholdActions = notRejected.filter(
      (action) =>
        action.value &&
        action.value >= threshold &&
        (index === 0 || action.value < thresholds[index - 1][0])
    )

    if (!thresholdActions.length) return null

    return (
      <div key={label}>
        <ActionList
          actions={thresholdActions}
          rules={rules}
          bilan={bilan}
          actionWithFormOpen={actionWithFormOpen}
          setActionWithFormOpen={setActionWithFormOpen}
        />

        <div className="my-4 h-8 w-full text-center">
          <p className="bg-primary-700 inline-block rounded-md px-4 py-1 text-sm font-medium text-white">
            <span>{label} &#9650;</span>
          </p>
        </div>
      </div>
    )
  })

  return (
    <>
      {maxImpactAction.value && maxImpactAction.value < 100 && (
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
        <p className="bg-primary-700 inline-flex items-center rounded-full px-4 text-sm font-medium text-white">
          <Image
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/270_A_0f004e2cbf.svg"
            className="mr-2 align-middle invert"
            height={36}
            width={36}
            alt=""
          />
          <Trans>Actions d'engagement</Trans> &#9660;
        </p>
      </div>

      <ActionList
        actions={notRejected.filter((action) => action.value === undefined)}
        rules={rules}
        bilan={bilan}
        setActionWithFormOpen={setActionWithFormOpen}
        actionWithFormOpen={actionWithFormOpen}
      />

      <div className="my-4 h-8 w-full text-center">
        <p className="bg-primary-700 inline-flex items-center rounded-full px-4 text-sm font-medium text-white">
          <Image
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/26_D4_ca89de0959.svg"
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
        setActionWithFormOpen={setActionWithFormOpen}
        actionWithFormOpen={actionWithFormOpen}
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
            setActionWithFormOpen={setActionWithFormOpen}
            actionWithFormOpen={actionWithFormOpen}
          />
        </div>
      )}
    </>
  )
}
