'use client'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

export default function WaterActions() {
  return (
    <div>
      <Title tag="h2">
        <TransClient>
          Comment <strong className="text-secondary-700">agir</strong> ?
        </TransClient>
      </Title>
      <p>
        <TransClient>
          <strong className="text-secondary-700">
            La majeure partie de l’empreinte eau concerne la pousse des
            végétaux,
          </strong>{' '}
          que ce soit pour nous alimenter, pour nourrir le bétail, ou pour
          obtenir la matière première de nombre de nos vêtements.
        </TransClient>
      </p>
      <p className="mb-6">
        <TransClient>Retrouvez nos conseils dans ces articles :</TransClient>
      </p>
      <div className="mb-4 flex justify-center gap-4">
        <Link
          href={'/blog/consommation/reflexes-textile-econome-empreinte-eau'}
          target="_blank"
          className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
          <div>
            <Image
              src="/images/blog/priscilla-du-preez-garde-robe.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 3 réflexes à adopter pour une garde-robe économe en eau`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              <TransClient>
                Les 3 réflexes à adopter pour une garde-robe économe en eau
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
            '/blog/alimentation/8-facons-ameliorer-empreinte-de-mon-assiette'
          }
          target="_blank"
          className="border-primary-50 hover:bg-primary-100 relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 bg-gray-100 pb-4 no-underline lg:p-4">
          <div>
            <Image
              src="/images/blog/lumin-osity-arrosage-champ.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 8 manières d’améliorer l'empreinte eau de mon assiette`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              <TransClient>
                Les 8 manières d’améliorer l'empreinte eau de mon assiette
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
