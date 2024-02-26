import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="flex flex-wrap justify-center gap-12 pt-14 lg:flex-nowrap lg:justify-start lg:gap-8">
      <div className="max-w-full md:w-[34rem]">
        <h1>
          <Trans>Nos Gestes Climat pour les organisations</Trans>
        </h1>

        <p className="mb-12 text-sm md:text-lg">
          <Trans>Vous souhaitez mobiliser votre</Trans>{' '}
          <strong className="text-primary-500">
            <Trans>entreprise</Trans>
          </strong>
          <Trans>, votre</Trans>{' '}
          <strong className="text-primary-500">
            <Trans>organisation</Trans>
          </strong>
          ,{' '}
          <strong className="text-primary-500">
            <Trans>association</Trans>
          </strong>
          , <Trans>ou </Trans>{' '}
          <strong className="text-primary-500">
            <Trans>salle de classe</Trans>
          </strong>
          &nbsp; ?{' '}
          <Trans>Découvrez nos outils pour vous simplifier la vie&nbsp;!</Trans>
        </p>

        <div className="flex flex-col flex-wrap items-center gap-8 md:flex-row md:items-baseline md:justify-center lg:justify-start">
          <ButtonLink href="/organisations/connexion" size="lg">
            <Trans>Commencez</Trans>
          </ButtonLink>

          <InlineLink className="py-4" href="/organisations/demander-demo">
            <Trans>Demandez une démo</Trans>
          </InlineLink>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          src="/images/organisations/group.svg"
          alt=""
          width="400"
          height="400"
          className="max-w-xs md:mx-auto md:max-w-lg"
        />
      </div>
    </div>
  )
}
