import Link from '@/components/Link'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'
import Ademe from './partners/Ademe'
import Marianne from './partners/Marianne'

export default async function Partners() {
  const { t } = await getServerTranslation()

  return (
    <div className="relative mb-4 flex justify-center md:-mt-10">
      <div className="flex items-center justify-center gap-6 rounded-full bg-white py-10 md:gap-8 md:px-24">
        <Marianne />
        <Link href="https://ademe.fr" target="_blank">
          <Ademe />
        </Link>
        <Link href="https://abc-transitionbascarbone.fr" target="_blank">
          <Image
            src="/images/misc/logo-abc-web.webp"
            alt={t("Logo de l'Association pour la transition Bas Carbone")}
            width="90"
            height="30"
          />
        </Link>
      </div>
    </div>
  )
}
