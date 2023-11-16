import InlineLink from '@/design-system/inputs/InlineLink'
import Image from 'next/image'
import Logo from '../misc/Logo'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/Trans'

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 bg-primary-100 p-4 pb-32 sm:p-8 md:mb-0 md:pb-24">
      <div className="flex items-start gap-8 md:mx-auto md:max-w-6xl">
        <Logo className="hidden lg:block" />

        <div className="w-full">
          <div className="flex flex-col flex-wrap justify-start gap-6 pt-4 sm:flex-row md:items-center">
            <InlineLink href="/nouveautes" className="no-underline">
              <strong>
                <Trans>Nouveautés</Trans>
              </strong>
            </InlineLink>

            <InlineLink href="/a-propos" className="no-underline">
              <strong>
                <Trans>Qui sommes-nous ?</Trans>
              </strong>
            </InlineLink>

            <InlineLink href="/documentation" className="no-underline">
              <strong>
                <Trans>Documentation</Trans>
              </strong>
            </InlineLink>

            <InlineLink href="/partenaires" className="no-underline">
              <strong>
                <Trans>Partagez le test !</Trans>
              </strong>
            </InlineLink>

            <InlineLink href="/plan-du-site" className="no-underline">
              <strong>
                <Trans>Plan du site</Trans>
              </strong>
            </InlineLink>
          </div>

          <div className="mt-6 flex w-full">
            <InlineLink href="/accessibilite" className="no-underline">
              <Trans>Accessibilité : partiellement conforme</Trans>
            </InlineLink>
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-10">
            <LanguageSwitchButton />

            <div className="mt-8 flex w-full items-start justify-center gap-4 md:mt-0 md:w-auto">
              <Image
                src="/images/misc/logo-france-relance.svg"
                alt="Logo de France Relance"
                className="mr-2 h-auto w-[3rem]"
                width="96"
                height="86"
              />

              <div className="flex flex-col items-center justify-center text-xs font-bold">
                <Image
                  src="/images/misc/union-européenne.svg"
                  alt="Logo de l'Union Européenne"
                  className="mr-2 h-auto w-[3rem]"
                  width="96"
                  height="86"
                />
                <span>NextGenerationEU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
