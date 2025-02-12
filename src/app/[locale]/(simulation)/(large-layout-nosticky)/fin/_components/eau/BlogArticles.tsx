'use client'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

export default function BlogArticles() {
  return (
    <div>
      <Title tag="h2">
        <TransClient>Aller plus loin</TransClient>
      </Title>
      <p className="mb-6">
        <TransClient>Nos articles sur le sujet :</TransClient>
      </p>
      <div className="mb-4 flex justify-center gap-4">
        <Link
          href={'/blog/environnement/lexique-eau-tout-comprendre'}
          target="_blank"
          className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
          <div>
            <Image
              src="/images/blog/philip-junior-mail-arroser-champ.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              <TransClient>
                Le lexique pour tout comprendre à l’empreinte eau
              </TransClient>
            </p>
          </div>
          <div className="text-primary-700 text-center text-sm underline">
            <TransClient>Lire l'article</TransClient>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
        <Link
          href={
            '/blog/actualites-et-fonctionnalites/empreinte-eau-pourquoi-comment'
          }
          target="_blank"
          className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
          <div>
            <Image
              src="/images/blog/william-bossen-fonte-glaces.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              <TransClient>
                L’empreinte eau : pourquoi et comment avons-nous travaillé…
              </TransClient>
            </p>
          </div>
          <div className="text-primary-700 text-center text-sm underline">
            <TransClient>Lire l'article</TransClient>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
      </div>
    </div>
  )
}
