import Trans from '@/components/translation/Trans'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { Organisation } from '@/types/organisations'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  organisation?: Organisation
  register: UseFormRegister<FieldValues>
}

export default function PersonalInfoFields({ organisation, register }: Props) {
  if (!organisation) return null

  return (
    <div className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Votre prénom</Trans>}
        value={organisation.administrators?.[0]?.name}
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
        value={organisation.administrators?.[0]?.telephone}
        {...register('administratorTelephone')}
      />

      <TextInputGroup
        label={<Trans>Votre e-mail</Trans>}
        value={organisation.administrators?.[0]?.email}
        {...register('email')}
      />

      <div className="w-[32rem]">
        <CheckboxInputGroup
          size="xl"
          defaultChecked={
            organisation.administrators?.[0]?.hasOptedInForCommunications
          }
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
