import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

export default function WaterActions() {
  return (
    <div>
      <Title tag="h2">
        <Trans>
          Comment <strong className="text-secondary-700">agir</strong> ?
        </Trans>
      </Title>
      <p>
        <Trans>
          <strong className="text-secondary-700">
            La majeure partie de l’empreinte eau concerne la pousse des
            végétaux,
          </strong>{' '}
          que ce soit pour nous alimenter, pour nourrir le bétail, ou pour
          obtenir la matière première de nombre de nos vêtements.
        </Trans>
      </p>
      <p className="mb-6">
        <Trans>Retrouvez nos conseils dans ces articles :</Trans>
      </p>
      <div className="mb-4 flex justify-center gap-4">
        <Link
          href={'/blog/reflexes-textile-econome-empreinte-eau'}
          target="_blank"
          className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100 lg:p-4">
          <div>
            <Image
              src="/images/blog/priscilla-du-preez-garde-robe.jpg"
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
          <div className="text-center text-sm text-primary-700 underline">
            <Trans>Lire l'article</Trans>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </div>
        </Link>
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100 lg:p-4">
          <div>
            <Image
              src="/images/blog/gareth-hubbard-qPcSUERqBAc-unsplash.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              <Trans>
                Les 4 gestes pour réduire l’empreinte eau de mon alimentation
              </Trans>
            </p>
          </div>
          <div className="flex justify-center">
            <Badge size="sm">
              <Trans>Bientôt disponible !</Trans>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
