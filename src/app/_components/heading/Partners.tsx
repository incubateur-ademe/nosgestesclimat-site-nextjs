import Link from '@/components/Link'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'
import Ademe from '../../../components/images/partners/Ademe'
import Marianne from '../../../components/images/partners/Marianne'

export default async function Partners() {
  const { t } = await getServerTranslation()

  return (
    <div className=" mb-4 flex justify-center md:-mt-10">
      <div className="relative mb-4 flex items-center justify-center gap-6 rounded-full bg-white py-4 md:mb-0 md:gap-8 md:px-24 md:py-10">
        <Marianne className="h-auto w-12 md:w-auto" />
        <Link href="https://ademe.fr" target="_blank">
          <Ademe className="h-auto w-10 md:w-auto" />
        </Link>
        <Link href="https://abc-transitionbascarbone.fr" target="_blank">
          <Image
            src="/images/misc/logo-abc-web.webp"
            alt={t("Logo de l'Association pour la transition Bas Carbone")}
            width="90"
            height="30"
            className="h-auto w-20"
          />
        </Link>
      </div>
    </div>
  )
}
