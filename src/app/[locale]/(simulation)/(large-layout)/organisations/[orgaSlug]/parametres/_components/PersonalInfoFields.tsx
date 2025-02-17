'use client'

import TransClient from '@/components/translation/trans/TransClient'
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
        label={<TransClient>Votre prénom</TransClient>}
        value={defaultValues.administratorFirstName}
        {...register('administratorFirstName', {
          required: t('Ce champ est requis'),
        })}
      />

      <TextInputGroup
        label={<TransClient>Votre nom</TransClient>}
        value={defaultValues.administratorLastName}
        {...register('administratorLastName', {
          required: t('Ce champ est requis'),
        })}
      />

      <TextInputGroup
        label={
          <p className="mb-0 flex items-center justify-between">
            <TransClient>Votre poste</TransClient>
            <span className="text-secondary-700 text-sm italic">
              <TransClient>facultatif</TransClient>
            </span>
          </p>
        }
        value={defaultValues.position}
        {...register('position')}
      />

      <TextInputGroup
        label={
          <p className="mb-0 flex w-full justify-between">
            <TransClient>Votre téléphone</TransClient>{' '}
            <span className="text-secondary-700 font-bold italic">
              {' '}
              <TransClient>facultatif</TransClient>
            </span>
          </p>
        }
        value={defaultValues.administratorTelephone}
        {...register('administratorTelephone')}
      />

      <TextInputGroup
        label={<TransClient>Votre e-mail</TransClient>}
        value={defaultValues.email}
        {...register('email', {
          required: t('Ce champ est requis'),
        })}
      />

      <div className="w-[32rem]">
        <CheckboxInputGroup
          size="xl"
          defaultChecked={defaultValues.hasOptedInForCommunications}
          label={
            <span>
              <strong>
                <TransClient>
                  Recevoir nos actualités sur les nouveaux services dédiés aux
                  organisation (une fois par mois maximum !)
                </TransClient>
              </strong>{' '}
              <TransClient>(une fois par mois maximum !)</TransClient>
            </span>
          }
          {...register('hasOptedInForCommunications')}
        />
      </div>
    </div>
  )
}
