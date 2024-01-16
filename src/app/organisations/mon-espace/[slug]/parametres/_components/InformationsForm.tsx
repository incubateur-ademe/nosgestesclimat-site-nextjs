import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { Organization } from '@/types/organizations'

type Props = {
  organization: Organization
}

export default function InformationsForm({ organization }: Props) {
  return (
    <section className="mt-8">
      <h2>
        <Trans>Mes informations</Trans>
      </h2>

      <p>
        <Trans>
          Vous pouvez modifier vos informations personnelles. Le lien du sondage
          de votre organisation ne changera pas.
        </Trans>
      </p>

      <form className="mt-8 flex flex-col gap-4">
        <TextInputGroup
          name="name"
          label={<Trans>Votre organisation</Trans>}
          defaultValue={organization?.name}
        />

        <TextInputGroup
          name="ownerName"
          label={<Trans>Votre prénom</Trans>}
          defaultValue={organization?.owner?.name}
        />

        <TextInputGroup
          name="email"
          disabled
          helperText={<Trans>Ce champ n'est pas modifiable</Trans>}
          label={<Trans>Votre e-mail</Trans>}
          defaultValue={organization?.owner?.email}
        />

        <div className="w-[32rem]">
          <CheckboxInputGroup
            name="hasOptedInForCommunications"
            defaultChecked={organization?.owner?.hasOptedInForCommunications}
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
          />
        </div>

        <Button type="submit" className="mt-12 self-start">
          <Trans>Modifier mes informations</Trans>
        </Button>
      </form>
    </section>
  )
}
