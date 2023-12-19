import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'

export default function HeroSection() {
  return (
    <div className="w-[34rem] max-w-full pt-14">
      <h1>
        <Trans>Nos Gestes Climat pour les organisations</Trans>
      </h1>

      <p className="mb-12">
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
        </strong>{' '}
        ? <Trans>Découvrez nos outils pour vous simplifier la vie !</Trans>
      </p>

      <div className="flex flex-wrap gap-8">
        <ButtonLink href="/organisation/commencez" size="lg">
          Commencez
        </ButtonLink>

        <ButtonLink
          color="text"
          size="lg"
          className="underline"
          href="/organisation/decouvrez">
          Demandez une démo
        </ButtonLink>
      </div>
    </div>
  )
}
