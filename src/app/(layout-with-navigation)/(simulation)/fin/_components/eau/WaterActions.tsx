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
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100 lg:p-4">
          <div>
            <Image
              src="/images/blog/erda-estremera-demenagement.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              Les 4 gestes pour réduire l’empreinte eau de mon alimentation
            </p>
          </div>
          <div className="flex justify-center">
            <Badge size="sm">Bientôt disponible !</Badge>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 no-underline hover:bg-primary-100 lg:p-4">
          <div>
            {' '}
            <Image
              src="/images/blog/campus.jpg"
              width="400"
              height="200"
              className="mx-auto mb-3 h-24 w-full object-cover lg:h-36"
              alt={`Les 4 gestes pour réduire l’empreinte eau de mon alimentation`}
            />
            <p className="mb-3 px-4 text-center text-sm leading-tight text-black lg:px-0 lg:text-base">
              Les 3 réflexes à adopter pour une garde-robe économe en eau
            </p>
          </div>
          <div className="flex justify-center">
            <Badge size="sm">Bientôt disponible !</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
