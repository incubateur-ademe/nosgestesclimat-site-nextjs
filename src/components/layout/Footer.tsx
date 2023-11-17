import InlineLink from '@/design-system/inputs/InlineLink'
import Emoji from '@/design-system/utils/Emoji'
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

            <InlineLink href="/blog" className="no-underline">
              <strong>
                <Trans>Blog</Trans>
              </strong>
            </InlineLink>

            <InlineLink href="/ambassadeurs" className="no-underline">
              <strong>
                <Trans>Nos ambassadeurs</Trans>
              </strong>
            </InlineLink>
          </div>

          <div className="mt-4 flex w-full flex-wrap gap-6">
            <InlineLink href="/accessibilite" className="no-underline">
              <Trans>Accessibilité : partiellement conforme</Trans>
            </InlineLink>

            <InlineLink href="/plan-du-site" className="no-underline">
              <Trans>Plan du site</Trans>
            </InlineLink>
          </div>

          <div className="mt-6 flex w-full flex-wrap items-baseline">
            <p className="mb-0 w-full text-xs text-primary-700">
              <Trans>Diffuser le test :</Trans>
            </p>
            <div className="flex flex-wrap gap-6">
              <InlineLink href="/diffuser" className="no-underline">
                <Emoji className="mr-2">🏢</Emoji>
                <Trans>Dans votre organisation</Trans>
              </InlineLink>

              <InlineLink href="/international" className="no-underline">
                <Emoji className="mr-2">🌍</Emoji>
                <Trans>À l'international</Trans>
              </InlineLink>
            </div>
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
