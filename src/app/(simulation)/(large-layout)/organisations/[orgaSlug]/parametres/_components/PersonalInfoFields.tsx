import Trans from '@/components/translation/Trans'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import type { OrgaSettingsInputsType } from '@/types/organisations'
import type { UseFormRegister } from 'react-hook-form'

type Props = {
  defaultValues?: OrgaSettingsInputsType
  register: UseFormRegister<OrgaSettingsInputsType>
}

export default function PersonalInfoFields({ defaultValues, register }: Props) {
  if (!defaultValues) return null

  return (
    <div className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Votre prénom</Trans>}
        value={defaultValues.administratorName}
        {...register('administratorName')}
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
        {...register('email')}
      />

      <div className="w-[32rem]">
        <CheckboxInputGroup
          size="xl"
          defaultChecked={defaultValues.hasOptedInForCommunications}
          label={
            <span>
              <strong>
                <Trans>
                  Recevoir nos actualités sur les nouveaux services dédiés aux
                  organisation (une fois par mois maximum !)
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
