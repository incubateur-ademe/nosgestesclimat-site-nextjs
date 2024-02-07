import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import InlineLink from '@/design-system/inputs/InlineLink'

export default function HeroSection() {
  return (
    <div className="w-[34rem] max-w-full pt-14">
      <h1>
        <Trans>Nos Gestes Climat pour les organisations</Trans>
      </h1>

      <p className="mb-12 text-lg">
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
        ? <Trans>Découvrez nos outils pour vous simplifier la vie&nbsp;!</Trans>
      </p>

      <div className="flex flex-wrap items-baseline gap-8">
        <ButtonLink href="/organisations/connexion" size="lg">
          <Trans>Commencez</Trans>
        </ButtonLink>

        <InlineLink className="py-4" href="/organisations/demander-demo">
          <Trans>Demandez une démo</Trans>
        </InlineLink>
      </div>
    </div>
  )
}
