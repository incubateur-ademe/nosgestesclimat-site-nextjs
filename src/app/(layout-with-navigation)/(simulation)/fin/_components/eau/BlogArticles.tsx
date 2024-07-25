import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

export default function BlogArticles() {
  return (
    <div>
      <Title tag="h2">
        <Trans>Aller plus loin</Trans>
      </Title>
      <p className="mb-6">
        <Trans>Nos articles sur le sujet :</Trans>
      </p>
      <div className="mb-4 flex justify-center gap-4">
        <Link
          href={'/blog/empreinte-eau-alimentation'}
          target="_blank"
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100 lg:p-4">
          <div>
            <Image
              src="/images/blog/velo.png"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              Petit lexique pour tout comprendre à l’empreinte eau
            </p>
          </div>
          <div className="text-center text-sm text-primary-700 underline">
            Lire l'article <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
        <Link
          href={'/blog/empreinte-eau-textile'}
          target="_blank"
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100 lg:p-4">
          <div>
            {' '}
            <Image
              src="/images/blog/william-bossen-fonte-glaces.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              L’empreinte eau : pourquoi et comment avons-nous travaillé…
            </p>
          </div>
          <div className="text-center text-sm text-primary-700 underline">
            Lire l'article <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
      </div>
    </div>
  )
}
