import Trans from '@/components/translation/Trans'
import { linkToGroupCreation } from '@/constants/group'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function GroupBlock() {
  const { t } = await getServerTranslation()
  return (
    <div className="bg-heroLightBackground flex w-full flex-col items-start justify-between gap-8 rounded-xl px-8 py-6 md:w-4/12">
      <h3 className="mb-0 text-xl font-medium">
        <Trans locale={locale}>
          <span>Comparez vos résultats avec</span>{' '}
          <span className="text-primary-600 font-bold">vos proches</span>
        </Trans>
      </h3>

      <Image
        src="/images/blog/comparer-empreinte-carbone-avec-ses-amis.svg"
        alt={t('Comparez vos résultats avec vos proches')}
        width={240}
        height={240}
      />

      <ButtonLink size="lg" color="secondary" href={linkToGroupCreation}>
        <Trans locale={locale}>Créer un groupe</Trans>
      </ButtonLink>
    </div>
  )
}
