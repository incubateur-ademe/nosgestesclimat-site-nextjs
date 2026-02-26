import Trans from '@/components/translation/trans/TransClient'
import { MON_ESPACE_ACTIONS_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getRules } from '@/helpers/modelFetching/getRules'
import { getAuthUser } from '@/helpers/server/model/user'
import { EngineProvider, UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import ActionDetail from './_components/ActionDetail'

export async function generateMetadata({
  params,
}: DefaultPageProps<{ params: { dottedName: DottedName[] } }>) {
  const { dottedName, locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t(
      "Actions, suite à votre simulation d'empreinte climat - Nos Gestes Climat"
    ),
    description: t(
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.'
    ),
    alternates: {
      canonical: `/actions/${dottedName.join('/')}`,
    },
  })
}

export default async function ActionDetailPage({
  params,
}: PageProps<'/[locale]/mon-espace/actions/[...dottedName]'>) {
  const { dottedName } = await params

  const rules = await getRules()

  const user = await getAuthUser()

  return (
    <UserProvider initialUserId={user.id}>
      <EngineProvider rules={rules}>
        <div className="mx-auto my-12 max-w-[600px]">
          <ButtonLink
            size="sm"
            color="text"
            href={MON_ESPACE_ACTIONS_PATH}
            className="flex items-center">
            <span role="img" className="pr-2 text-[0.5rem]!" aria-hidden>
              ◀
            </span>{' '}
            <Trans> Retour à la liste</Trans>
          </ButtonLink>

          <ActionDetail pathParamsDottedName={dottedName} />
        </div>
      </EngineProvider>
    </UserProvider>
  )
}
