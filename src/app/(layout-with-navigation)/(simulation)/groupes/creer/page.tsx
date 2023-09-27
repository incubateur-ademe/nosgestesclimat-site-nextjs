'use client'

import Meta from '@/components/misc/Meta'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import GroupCreationForm from './_component/GroupCreationForm'

export default function CreerGroupePage() {
  const { t } = useClientTranslation()

  return (
    <div className="p-4 md:p-8">
      <Meta
        title={t('Créer un groupe et calculer notre empreinte carbone')}
        description={t(
          "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
        )}
      />

      <AutoCanonicalTag />

      <GoBackLink className="mb-4 font-bold" />

      <Title
        title={t("Créer un groupe d'amis")}
        subtitle={t(
          'Comparez vos résultats avec votre famille ou un groupe d’amis'
        )}
      />

      <GroupCreationForm />
    </div>
  )
}
