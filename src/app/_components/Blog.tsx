import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ColorLine from '@/design-system/layout/ColorLine'
import Image from 'next/image'

export default function Blog() {
  return (
    <div className="relative bg-primary-50 pb-20 pt-16">
      <h2 className="mb-12 text-center text-3xl">
        <Trans>Décryptez les défis environnementaux</Trans>
      </h2>
      <div className="space-between mx-auto flex max-w-5xl gap-8">
        <Link
          href={'/blog/lexique-eau-tout-comprendre'}
          target="_blank"
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100">
          <div>
            <Image
              src="/images/blog/philip-junior-mail-arroser-champ.jpg"
              width="321"
              height="240"
              className="mx-auto mb-3 h-24 w-full rounded-lg object-cover lg:h-60"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-sm leading-tight text-black lg:text-base">
              <Trans>Le lexique pour tout comprendre à l’empreinte eau</Trans>
            </p>
          </div>
          <div className="px-4 text-right text-sm text-primary-700 underline">
            <Trans>Lire la suite</Trans>
          </div>
        </Link>
        <Link
          href={'/blog/lexique-eau-tout-comprendre'}
          target="_blank"
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100">
          <div>
            <Image
              src="/images/blog/philip-junior-mail-arroser-champ.jpg"
              width="321"
              height="240"
              className="mx-auto mb-3 h-24 w-full rounded-lg object-cover lg:h-60"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-sm leading-tight text-black lg:text-base">
              <Trans>Le lexique pour tout comprendre à l’empreinte eau</Trans>
            </p>
          </div>
          <div className="px-4 text-right text-sm text-primary-700 underline">
            <Trans>Lire la suite</Trans>
          </div>
        </Link>
        <Link
          href={'/blog/lexique-eau-tout-comprendre'}
          target="_blank"
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100">
          <div>
            <Image
              src="/images/blog/philip-junior-mail-arroser-champ.jpg"
              width="321"
              height="240"
              className="mx-auto mb-3 h-24 w-full rounded-lg object-cover lg:h-60"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-sm leading-tight text-black lg:text-base">
              <Trans>Le lexique pour tout comprendre à l’empreinte eau</Trans>
            </p>
          </div>
          <div className="px-4 text-right text-sm text-primary-700 underline">
            <Trans>Lire la suite</Trans>
          </div>
        </Link>
      </div>
      <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[4px] w-full animate-rainbow-slow transition-all" />
    </div>
  )
}
