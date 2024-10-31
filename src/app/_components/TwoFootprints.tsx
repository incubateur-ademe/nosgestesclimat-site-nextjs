import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import Image from 'next/image'

export default function TwoFootprints() {
  return (
    <div className="mb-20 flex flex-col items-center px-4 md:mx-auto md:max-w-5xl">
      <div className="relative mb-16 pb-4 md:mb-20">
        <h2 className="mb-0 text-center text-2xl md:text-3xl">
          <Trans>Un calculateur, deux empreintes</Trans>
        </h2>
        <ColorLine className="bg-rainbow absolute bottom-0 left-0 h-[3px] w-[100%] animate-rainbow-slow transition-all" />
      </div>

      <Image
        src="/images/misc/two-footprints.svg"
        className="hidden md:block"
        alt=""
        width={800}
        height={800}
      />

      <div className="flex flex-col gap-16 md:flex-row md:gap-8">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="-mb-10 flex justify-center md:hidden">
              <Image
                src="/images/misc/carbon-footprint.svg"
                alt=""
                width={300}
                height={300}
              />
            </div>

            <h3 className="mb-0 text-xl md:text-2xl">
              <Trans>L'empreinte carbone</Trans>
            </h3>

            <Separator className="my-4" />
          </div>

          <p className="mb-6 text-sm md:text-lg">
            <Trans>
              <strong className="text-primary-700">L’empreinte carbone</strong>{' '}
              représente la quantité de gaz à effet de serre émise par les
              activités humaines. Le calculateur d’empreinte carbone aide à{' '}
              <strong className="text-primary-700">repérer les usages</strong>{' '}
              qui contribuent le plus au changement climatique et à{' '}
              <strong className="text-primary-700">choisir les actions</strong>{' '}
              les plus efficaces pour réduire son impact.
            </Trans>
          </p>

          <Link href="/empreinte-carbone" className="text-[13px] md:text-base">
            <Trans>En savoir plus sur l'empreinte carbone</Trans>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="-mb-10 flex justify-center md:hidden">
              <Image
                src="/images/misc/water-footprint.svg"
                alt=""
                width={300}
                height={300}
              />
            </div>

            <h3 className="mb-0 text-xl md:text-2xl">
              <Trans>L'empreinte eau</Trans>
            </h3>

            <Separator className="my-4" />
          </div>

          <p className="mb-6 text-sm md:text-lg">
            <Trans>
              <strong className="text-primary-700">L’empreinte eau</strong>{' '}
              mesure la quantité totale d’eau utilisée pour produire les biens
              et services que nous consommons. Contrairement à l’eau domestique,{' '}
              <strong className="text-primary-700">
                elle inclut l’eau invisible
              </strong>{' '}
              nécessaire pour cultiver nos aliments, fabriquer nos vêtements et
              produire de l’énergie.
            </Trans>
          </p>

          <Link href="/empreinte-eau" className="text-[13px] md:text-base">
            <Trans>En savoir plus sur l'empreinte eau</Trans>
          </Link>
        </div>
      </div>
    </div>
  )
}
