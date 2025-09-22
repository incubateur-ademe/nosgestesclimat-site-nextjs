'use client'

import Trans from '@/components/translation/trans/TransClient'
import CheckboxInput from '@/design-system/inputs/CheckboxInput'
import TextInput from '@/design-system/inputs/TextInput'
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
      <TextInput
        label={<Trans>Votre prénom</Trans>}
        autoComplete="given-name"
        value={defaultValues.administratorFirstName}
        {...register('administratorFirstName', {
          required: t('Ce champ est requis'),
        })}
      />

      <TextInput
        label={<Trans>Votre nom</Trans>}
        autoComplete="family-name"
        value={defaultValues.administratorLastName}
        {...register('administratorLastName', {
          required: t('Ce champ est requis'),
        })}
      />

      <TextInput
        label={
          <p className="mb-0 flex items-center justify-between">
            <Trans>Votre poste</Trans>
            <span className="text-secondary-700 text-sm italic">
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        value={defaultValues.position}
        autoComplete="organization-title"
        {...register('position')}
      />

      <TextInput
        label={
          <p className="mb-0 flex w-full justify-between">
            <Trans>Votre téléphone</Trans>{' '}
            <span className="text-secondary-700 font-bold italic">
              {' '}
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        autoComplete="tel"
        value={defaultValues.administratorTelephone}
        {...register('administratorTelephone')}
      />

      <TextInput
        label={<Trans>Votre e-mail</Trans>}
        value={defaultValues.email}
        autoComplete="email"
        {...register('email', {
          required: t('Ce champ est requis'),
        })}
      />

      <div className="w-[32rem] max-w-full">
        <CheckboxInput
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
