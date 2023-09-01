import imageSrc from '@/assets/images/270A.svg'

import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { FromTop } from '@/design-system/utils/Animate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import Image from 'next/image'
import ActionList from './_components/ActionList'

type Props = {
  actions: any
  bilan: any
  rules: any
  focusedAction: string
  focusAction: (dottedName: string) => void
  radical: boolean
}

export default function Actions({
  actions: rawActions,
  bilan,
  rules,
  focusedAction,
  focusAction,
  radical,
}: Props) {
  const { t } = useClientTranslation()

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

  const { getCurrentSimulation } = useUser()

  const { actionChoices } = getCurrentSimulation()

  const rejected = actions.filter(
    (a: any) => actionChoices[a.dottedName] === false
  )

  const notRejected = actions.filter(
    (a: any) => actionChoices[a.dottedName] !== false
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

        <div className="w-full h-8 text-center my-4">
          <p className="inline-block font-medium bg-primaryDark rounded-md ">
            <p>{label} &#9650;</p>
          </p>
        </div>
      </div>
    )
  })

  return (
    <div>
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

      <div className="w-full h-8 text-center my-4">
        <p className="inline-block font-medium bg-primaryDark rounded-md ">
          <Image
            src={imageSrc}
            className="invert-1 align-middle mr-2"
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
      <div className="w-full h-8 text-center my-4">
        <p className="inline-block font-medium bg-primaryDark rounded-md ">
          <Image
            src={imageSrc}
            className="invert-1 align-middle mr-2"
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
