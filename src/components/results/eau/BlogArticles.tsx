'use client'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'

export default function BlogArticles() {
  const { t } = useClientTranslation()

  return (
    <div>
      <Title tag="h2">
        <Trans>Aller plus loin</Trans>
      </Title>
      <p className="mb-6">
        <Trans>Nos articles sur le sujet :</Trans>
      </p>
      <ul className="mb-4 flex justify-center gap-4">
        <li>
          <Link
            href={'/blog/environnement/lexique-eau-tout-comprendre'}
            target="_blank"
            className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
            <div>
              <Image
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_philip_junior_mail_Bp_Uk_WK_6hf_JA_unsplash_0f0f3b01c2.jpg"
                width="400"
                height="200"
                className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
                alt={`Les 4 gestes pour réduire l'empreinte eau de mon alimentation`}
              />
              <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
                <Trans>Le lexique pour tout comprendre à l'empreinte eau</Trans>
              </p>
            </div>
            <div className="text-primary-700 text-center text-sm underline">
              <Trans>Lire l'article</Trans>{' '}
              <ExternalLinkIcon
                role="img"
                aria-label={t(
                  'endPage.blogArticles.lireArticle',
                  "Ouvrir l'article dans une nouvelle fenêtre"
                )}
                className="stroke-primary-700 ml-2"
              />
            </div>
          </Link>
        </li>
        <li>
          <Link
            href={
              '/blog/actualites-et-fonctionnalites/empreinte-eau-pourquoi-comment'
            }
            target="_blank"
            className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
            <div>
              <Image
                src="https://s3.fr-par.scw.cloud/nosgestesclimat-prod/cms/medium_william_bossen_fonte_glaces_a3dd8ea653.jpg"
                width="400"
                height="200"
                className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
                alt={`Les 4 gestes pour réduire l'empreinte eau de mon alimentation`}
              />
              <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
                <Trans>
                  L'empreinte eau : pourquoi et comment avons-nous travaillé…
                </Trans>
              </p>
            </div>
            <div className="text-primary-700 text-center text-sm underline">
              <Trans>Lire l'article</Trans>{' '}
              <ExternalLinkIcon
                role="img"
                aria-label={t(
                  'endPage.blogArticles.lireArticle',
                  "Ouvrir l'article dans une nouvelle fenêtre"
                )}
                className="stroke-primary-700 ml-2"
              />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
