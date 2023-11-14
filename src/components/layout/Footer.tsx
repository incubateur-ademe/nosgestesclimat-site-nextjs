import InlineLink from '@/design-system/inputs/InlineLink'
import { getServerPathname } from '@/helpers/getServerPathname'
import Image from 'next/image'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/Trans'

export default function Footer() {
  const pathname = getServerPathname() as unknown as string

  const isLandingPage = pathname === '/'

  return (
    <footer className="flex flex-col gap-4 bg-white p-4 pb-32 sm:p-8 md:mb-0 md:pb-24">
      {isLandingPage && (
        <div className="m-4 flex flex-wrap items-center justify-center gap-4">
          <Image
            src="/images/misc/logo-france-relance.svg"
            alt="Logo de France Relance"
            className="mr-2 h-auto w-[5rem]"
            width="96"
            height="86"
          />

          <div className="flex flex-col items-center justify-center font-bold">
            <Image
              src="/images/misc/union-européenne.svg"
              alt="Logo de l'Union Européenne"
              className="mr-2 h-auto w-[5rem]"
              width="96"
              height="86"
            />
            <span>NextGenerationEU</span>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-wrap justify-start gap-2 md:flex-row md:items-center md:justify-center md:gap-3">
        <InlineLink href="/a-propos">
          <Trans>À propos</Trans>
        </InlineLink>

        <InlineLink href={'/documentation'}>
          <Trans>Documentation</Trans>
        </InlineLink>

        <InlineLink href="/partenaires">
          <Trans>Diffuser</Trans>
        </InlineLink>
        <InlineLink href="/nouveautes">
          <Trans>Nouveautés</Trans>
        </InlineLink>
        <InlineLink href="/international">
          <Trans>International</Trans>
        </InlineLink>
        <InlineLink href="/blog">
          <Trans>Blog</Trans>
        </InlineLink>
        <InlineLink href="/ambassadeurs">
          <Trans>Ambassadeurs</Trans>
        </InlineLink>
        <InlineLink href="/plan-du-site">
          <Trans i18nKey="publicodes.planDuSite.title">Plan du site</Trans>
        </InlineLink>
      </div>

      <div className="flex w-full md:justify-center">
        <InlineLink href="/accessibilite">
          <Trans>Accessibilité : partiellement conforme</Trans>
        </InlineLink>
      </div>
      <div className="mt-2 md:flex md:justify-center">
        <LanguageSwitchButton />
      </div>
    </footer>
  )
}
