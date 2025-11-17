'use client'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'

export default function WaterActions() {
  const { t } = useClientTranslation()
  return (
    <div>
      <Title tag="h2">
        <Trans>
          Comment <strong className="text-secondary-700">agir</strong> ?
        </Trans>
      </Title>
      <p>
        <Trans>
          <strong className="text-secondary-700">
            La majeure partie de l'empreinte eau concerne la pousse des
            végétaux,
          </strong>{' '}
          que ce soit pour nous alimenter, pour nourrir le bétail, ou pour
          obtenir la matière première de nombre de nos vêtements.
        </Trans>
      </p>
      <p className="mb-6">
        <Trans>Retrouvez nos conseils dans ces articles :</Trans>
      </p>
      <ul className="mb-4 flex justify-center gap-4">
        <li>
          <Link
            href={'/blog/consommation/reflexes-textile-econome-empreinte-eau'}
            target="_blank"
            className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
            <div>
              <Image
                src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_priscilla_du_preez_9d7a6e02a2.jpg"
                width="400"
                height="200"
                className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
                alt={`Les 3 réflexes à adopter pour une garde-robe économe en eau`}
              />
              <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
                <Trans>
                  Les 3 réflexes à adopter pour une garde-robe économe en eau
                </Trans>
              </p>
            </div>
            <div className="text-primary-700 text-center text-sm underline">
              <Trans>Lire l'article</Trans>{' '}
              <ExternalLinkIcon
                role="img"
                aria-label={t(
                  'endPage.waterActions.lireArticle',
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
              '/blog/alimentation/8-facons-ameliorer-empreinte-de-mon-assiette'
            }
            target="_blank"
            className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
            <div>
              <Image
                src="https://s3.fr-par.scw.cloud/nosgestesclimat-prod/cms/medium_lumin_osity_arrosage_champ_eeafa85606.jpg"
                width="400"
                height="200"
                className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
                alt={`Les 8 manières d'améliorer l'empreinte eau de mon assiette`}
              />
              <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
                <Trans>
                  Les 8 manières d'améliorer l'empreinte eau de mon assiette
                </Trans>
              </p>
            </div>
            <div className="text-primary-700 text-center text-sm underline">
              <Trans>Lire l'article</Trans>{' '}
              <ExternalLinkIcon
                role="img"
                aria-label={t(
                  'endPage.waterActions.lireArticle',
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
