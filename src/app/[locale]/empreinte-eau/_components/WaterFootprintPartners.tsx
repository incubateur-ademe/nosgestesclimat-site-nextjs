import Ademe from '@/components/images/partners/Ademe'
import Marianne from '@/components/images/partners/Marianne'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import Image from 'next/image'

export default async function WaterFootprintPartners({
  locale,
}: {
  locale: Locale
}) {
  const { t } = await getServerTranslation({ locale })
  return (
    <>
      <Marianne className="h-auto w-12 md:w-auto" />

      <Ademe className="h-auto w-10 md:w-auto" />

      <Image
        src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/logo_agences_eau_8f0e7f34cb.svg"
        alt="Les agences de l'eau"
        width="200"
        height="200"
        className="h-auto w-20"
      />
    </>
  )
}
