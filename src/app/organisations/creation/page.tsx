'use client'

import Trans from '@/components/translation/Trans'
import { SERVER_URL } from '@/constants/urls'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'

axios.defaults.withCredentials = true

export default function CreationPage() {
  const pathname = usePathname()

  const { user } = useUser()

  const { isError } = useQuery({
    queryKey: ['organization-validate-jwt'],
    queryFn: () =>
      axios.post(`${SERVER_URL}/organizations/validate-jwt`, {
        ownerEmail: user?.email,
      }),
    enabled: !!user?.email,
  })

  const { mutateAsync: updateOrganization } = useMutation({
    mutationFn: ({
      name,
      slug,
      ownerName,
      position,
      telephone,
      numberOfParticipants,
      hasOptedInForCommunications,
    }: {
      name: string
      slug: string
      ownerName: string
      position: string
      telephone: string
      numberOfParticipants: string
      hasOptedInForCommunications: boolean
    }) =>
      axios
        .post(`${SERVER_URL}/organizations/update-after-creation`, {
          name,
          slug,
          ownerName,
          position,
          telephone,
          numberOfParticipants,
          hasOptedInForCommunications,
          ownerEmail: user?.email,
        })
        .then((response) => response.data),
  })

  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(document.querySelector('form') ?? undefined)

    const name = data.get('name') as string
    const slug = name.toLowerCase().replace(/ /g, '-')
    const ownerName = data.get('ownerName') as string
    const position = data.get('position') as string
    const telephone = data.get('telephone') as string
    const numberOfParticipants = data.get('numberOfParticipants') as string

    const hasOptedInForCommunications = (data.get(
      'hasOptedInForCommunications'
    ) as string)
      ? true
      : false

    try {
      const organizationUpdated = await updateOrganization({
        name,
        slug,
        ownerName,
        position,
        telephone,
        numberOfParticipants,
        hasOptedInForCommunications,
      })

      router.push(`/organisations/mon-espace/${organizationUpdated?.slug}`)
    } catch (error: any) {
      console.error(error)
    }
  }

  if (isError) {
    router.push('/404')
    return
  }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: 'Accueil',
            isActive: pathname === '/',
          },
          {
            href: '/organisations',
            label: 'Organisations',
            isActive: pathname === '/organisations',
          },
        ]}
      />
      <section className="mt-6 w-full bg-[#fff]">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-0">
          <Title
            title={<Trans>Bienvenue sur votre espace !</Trans>}
            subtitle={<Trans>Plus que quelques petites questions</Trans>}
          />

          <form onSubmit={handleSubmit}>
            <TextInputGroup
              name="name"
              label={<Trans>Votre organisation</Trans>}
              required
              className="mb-4"
            />

            <TextInputGroup
              name="ownerName"
              label={<Trans>Votre prénom</Trans>}
              required
              className="mb-4"
            />

            <Separator />

            <TextInputGroup
              name="position"
              label={<Trans>Votre rôle</Trans>}
              className="mb-4"
            />

            <TextInputGroup
              type="telephone"
              name="telephone"
              label={<Trans>Téléphone</Trans>}
              className="mb-4"
            />

            <TextInputGroup
              name="numberOfParticipants"
              type="number"
              label={<Trans>Nombre de participants (estimé)</Trans>}
              className="mb-4"
            />

            <Separator />

            <div className="w-[32rem]">
              <CheckboxInputGroup
                name="hasOptedInForCommunications"
                label={
                  <span>
                    <strong>
                      <Trans>
                        Recevoir ponctuellement par email les nouveaux services
                        Nos Gestes Climat aux organisations
                      </Trans>
                    </strong>{' '}
                    (une fois par mois maximum !)
                  </span>
                }
              />
            </div>

            <Button type="submit" className="mt-12">
              <Trans>Accéder à mon espace</Trans>
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
