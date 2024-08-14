import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
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
        <p>
          L'empreinte eau, c'est l'ensemble de l'eau consommée pour produire et
          distribuer les biens et services de votre quotidien. Par exemple il
          faut de l’eau :
        </p>
        <ul className="mb-4">
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">🍅</Emoji>
            <span className="flex-1">
              pour les{' '}
              <strong className="text-secondary-700">
                fruits, légumes et céréales
              </strong>{' '}
              que vous mangez
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">👕</Emoji>
            <span className="flex-1">
              pour la culture du{' '}
              <strong className="text-secondary-700">coton</strong> que vous
              portez
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">🐮</Emoji>
            <span className="flex-1">
              pour l’alimentation des{' '}
              <strong className="text-secondary-700">animaux</strong> que vous
              consommez
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">📱</Emoji>
            <span className="flex-1">
              pour l’extraction des matériaux de vos{' '}
              <strong className="text-secondary-700">
                appareils numériques
              </strong>
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">⚡️</Emoji>
            <span className="flex-1">
              pour la production de votre{' '}
              <strong className="text-secondary-700">électricité</strong>
            </span>
          </li>
          <li className="mb-1 flex items-start gap-3">
            <Emoji className="mt-1 text-2xl">🚫</Emoji>
            <span className="flex-1">
              attention : l'eau domestique (par exemple l’eau de vos douches) ne
              fait pas partie de l'empreinte eau
            </span>
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
