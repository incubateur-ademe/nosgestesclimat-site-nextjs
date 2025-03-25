'use client'

import Trans from '@/components/translation/trans/TransClient'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { OrgaSettingsInputsType } from '@/types/organisations'
import type { UseFormRegister } from 'react-hook-form'

type Props = {
  defaultValues?: OrgaSettingsInputsType
  register: UseFormRegister<OrgaSettingsInputsType>
}

export default function PersonalInfoFields({ defaultValues, register }: Props) {
  const { t } = useClientTranslation()

  if (!defaultValues) return null

  return (
    <div className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Votre prénom</Trans>}
        value={defaultValues.administratorFirstName}
        {...register('administratorFirstName', {
          required: t('Ce champ est requis'),
        })}
      />

      <TextInputGroup
        label={<Trans>Votre nom</Trans>}
        value={defaultValues.administratorLastName}
        {...register('administratorLastName', {
          required: t('Ce champ est requis'),
        })}
      />

      <TextInputGroup
        label={
          <p className="mb-0 flex items-center justify-between">
            <Trans>Votre poste</Trans>
            <span className="text-sm italic text-secondary-700">
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        value={defaultValues.position}
        {...register('position')}
      />

      <TextInputGroup
        label={
          <p className="mb-0 flex w-full justify-between">
            <Trans>Votre téléphone</Trans>{' '}
            <span className="font-bold italic text-secondary-700">
              {' '}
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        value={defaultValues.administratorTelephone}
        {...register('administratorTelephone')}
      />

      <TextInputGroup
        label={<Trans>Votre e-mail</Trans>}
        value={defaultValues.email}
        {...register('email', {
          required: t('Ce champ est requis'),
        })}
      />

      <div className="w-[32rem]">
        <CheckboxInputGroup
          size="xl"
          disableSubmitOnEnter
          defaultChecked={defaultValues.hasOptedInForCommunications}
          label={
            <span>
              <strong>
                <Trans>
                  Recevoir nos actualités sur les nouveaux services dédiés aux
                  organisation
                </Trans>
              </strong>{' '}
              <Trans>(une fois par mois maximum !)</Trans>
            </span>
          }
          {...register('hasOptedInForCommunications')}
        />
      </div>
    </div>
  )
}
