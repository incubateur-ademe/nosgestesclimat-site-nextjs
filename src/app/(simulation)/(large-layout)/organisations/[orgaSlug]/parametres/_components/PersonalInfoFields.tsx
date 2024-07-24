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
  return (
    <div className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Votre prénom</Trans>}
        value={organisation?.administrators?.[0]?.name}
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
        value={organisation?.administrators?.[0]?.telephone}
        {...register('administratorTelephone')}
      />

      <TextInputGroup
        disabled
        helperText={<Trans>Ce champ n'est pas modifiable</Trans>}
        label={<Trans>Votre e-mail</Trans>}
        value={organisation?.administrators?.[0]?.email}
        {...register('email')}
      />

      <div className="w-[32rem]">
        <CheckboxInputGroup
          size="xl"
          defaultChecked={
            organisation?.administrators?.[0]?.hasOptedInForCommunications
          }
          label={
            <span>
              <strong>
                <Trans>
                  Recevoir ponctuellement par email les nouveaux services Nos
                  Gestes Climat aux organisations
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
