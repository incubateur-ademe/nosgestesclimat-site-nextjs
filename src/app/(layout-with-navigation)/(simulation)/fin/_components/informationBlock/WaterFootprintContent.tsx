import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Title from '@/design-system/layout/Title'
import { twMerge } from 'tailwind-merge'

type Props = {
  isOpen: boolean
  isHedgehog: boolean
}

const title = (
  <span className="lg:tracking-tight	">
    <Trans>
      <strong className="font-black text-secondary-700">
        L’empreinte eau,
      </strong>{' '}
      c’est quoi ?
    </Trans>
  </span>
)
export default function IndirectWaterContent({ isOpen, isHedgehog }: Props) {
  return (
    <>
      <div className={twMerge('lg:hidden', isOpen ? '' : '-mb-8')}>
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          hasSeparator={isOpen}
          title={title}
        />
      </div>
      <div className="hidden lg:block">
        <Title tag="h2" className=" text-lg lg:text-2xl" title={title} />
      </div>
      <div
        className={twMerge(
          'lg:block',
          isOpen || isHedgehog ? 'block' : 'hidden'
        )}>
        <ul className="list-disc pl-4">
          <li className="mb-1">
            L’empreinte eau c’est déjà l’eau de votre{' '}
            <strong className="text-secondary-700">
              consommation domestique
            </strong>
             ;
          </li>
          <li className="mb-1">
            mais c’est celle aussi qui a fait pousser les{' '}
            <strong className="text-secondary-700">
              fruits, légumes et céréales
            </strong>{' '}
            que vous mangez, ou le{' '}
            <strong className="text-secondary-700">coton</strong> que vous
            portez ;
          </li>
          <li className="mb-1">
            celle qui a aidé à faire grandir les{' '}
            <strong className="text-secondary-700">animaux</strong> que vous
            consommez ;
          </li>
          <li className="mb-1">
            celle évaporée par les{' '}
            <strong className="text-secondary-700">centrales</strong> ;
          </li>
          <li className="mb-1">
            ou encore celle qui a servi à extraire les matériaux de vos{' '}
            <strong className="text-secondary-700">appareils numériques</strong>
            .
          </li>
        </ul>
        <div className="flex justify-end">
          <Link className="text-sm" href="/empreinte-eau" target="_blank">
            <Trans>En savoir plus</Trans>{' '}
            <ExternalLinkIcon className="stroke-primary-700" />
          </Link>
        </div>
      </div>
    </>
  )
}
