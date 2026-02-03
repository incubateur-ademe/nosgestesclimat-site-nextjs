import StepsDisplay from '@/components/groups/StepsDisplay'
import { linkToGroupCreation, SHOW_STEP_KEY } from '@/constants/group'
import { amisCreationVotreGroupeRetour } from '@/constants/tracking/pages/amisCreation'
import GoBackButton from '@/design-system/inputs/GoBackButton'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { getUser } from '@/helpers/server/model/user'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import NameForm from './_components/NameForm'

export const generateMetadata = getCommonMetadata({
  title: t('Créer un groupe, étape 2 sur 2 - Nos Gestes Climat'),
  description: t(
    "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au calculateur de bilan carbone personnel Nos Gestes Climat."
  ),
  alternates: {
    canonical: linkToGroupCreation,
  },
})

export default async function GroupNamePage({
  params,
  searchParams,
}: DefaultPageProps<{ searchParams: { [SHOW_STEP_KEY]: string } }>) {
  const { locale } = await params
  const { [SHOW_STEP_KEY]: showStep } = (await searchParams) ?? {}
  const user = await getUser()
  if (!user) {
    redirect('/mon-espace/groupes')
  }

  const { t } = await getServerTranslation({ locale })

  return (
    <div className="pb-8">
      <GoBackButton
        className="mb-4 font-bold"
        eventTracked={amisCreationVotreGroupeRetour}
      />

      {Boolean(showStep) && <StepsDisplay currentStep={2} />}

      <Title
        title={t("Créer un groupe d'amis")}
        subtitle={t('Invitez vos proches à passer le test')}
      />
      <NameForm user={user} />
    </div>
  )
}
