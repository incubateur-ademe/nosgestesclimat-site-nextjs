import Trans from '@/components/translation/trans/TransServer'
import { linkToGroupCreation } from '@/constants/group'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function GroupBlock({ locale }: { locale: string }) {
  const { t } = await getServerTranslation({ locale })
  return (
    <div className="flex w-full flex-col items-start justify-between gap-8 rounded-xl bg-heroLightBackground px-8 py-6 md:w-4/12">
      <h3 className="mb-0 text-xl font-medium">
        <Trans locale={locale}>
          <span>Comparez vos résultats avec</span>{' '}
          <span className="font-bold text-primary-600">vos proches</span>
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
