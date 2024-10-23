import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ColorLine from '@/design-system/layout/ColorLine'
import Title from '@/design-system/layout/Title'
import Image from 'next/image'

export default function MultiFootprint() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center py-20">
      <h2 className="relative mb-16 pb-3 text-3xl">
        <Trans>Un calculateur, deux empreintes</Trans>
        <ColorLine className="bg-rainbow absolute left-0 top-full h-[3px] w-full animate-rainbow-slow transition-all" />
      </h2>
      <Image
        src="/images/misc/home-multifootprint.svg"
        alt="Illustration"
        width={694}
        height={340}
        loading="lazy"
      />
      <div className="flex gap-10">
        <div className="flex-1">
          <Title tag="h3" className="text-2xl">
            <Trans>L'empreinte carbone</Trans>
          </Title>
          <p className="text-lg">
            <Trans>
              <span className="text-primary-700">L’empreinte carbone</span>{' '}
              représente la quantité de gaz à effet de serre émise par les
              activités humaines. Le calculateur d’empreinte carbone aide à{' '}
              <strong className="text-primary-700">repérer les usages</strong>{' '}
              qui contribuent le plus au changement climatique et à{' '}
              <strong className="text-primary-700">choisir les actions</strong>{' '}
              les plus efficaces pour réduire son impact.
            </Trans>
          </p>
          <Link href="#">
            <Trans>En savoir plus sur l’empreinte carbone</Trans>
          </Link>
        </div>
        <div className="flex-1">
          <Title tag="h3" className="text-2xl">
            <Trans>L'empreinte eau</Trans>
          </Title>
          <p className="text-lg">
            <Trans>
              <span className="text-primary-700">L’empreinte eau</span> mesure
              la quantité totale d’eau utilisée pour produire les biens et
              services que nous consommons. Contrairement à l’eau domestique,{' '}
              <strong className="text-primary-700">
                elle inclut l’eau invisible
              </strong>{' '}
              nécessaire pour cultiver nos aliments, fabriquer nos vêtements et
              produire de l’énergie.
            </Trans>
          </p>
          <Link href="#">
            <Trans>En savoir plus sur l’empreinte eau</Trans>
          </Link>
        </div>
      </div>
    </div>
  )
}
