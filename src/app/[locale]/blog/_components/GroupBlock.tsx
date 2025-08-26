import Trans from '@/components/translation/trans/TransServer'
import { linkToGroupCreation } from '@/constants/group'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Image from 'next/image'

export default async function GroupBlock({ locale }: { locale: string }) {
  return (
    <div className="bg-heroLightBackground flex w-full flex-col items-start justify-between gap-8 rounded-xl px-8 py-6 md:w-4/12">
      <h3 className="mb-0 text-xl font-medium">
        <Trans locale={locale}>
          <span>Comparez vos résultats avec</span>{' '}
          <span className="text-primary-700 font-bold">vos proches</span>
        </Trans>
      </h3>

      <Image
        src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_comparer_empreinte_carbone_et_eau_entre_amis_ddbfa5e83d.svg"
        alt=""
        width={240}
        height={240}
      />

      <ButtonLink size="lg" color="secondary" href={linkToGroupCreation}>
        <Trans locale={locale}>Créer un groupe</Trans>
      </ButtonLink>
    </div>
  )
}
