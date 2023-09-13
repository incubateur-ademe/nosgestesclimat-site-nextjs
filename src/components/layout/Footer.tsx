import franceRelanceLogo from '@/assets/images/logo-france-relance.svg'
import ueLogo from '@/assets/images/union-européenne.svg'
import InlineLink from '@/design-system/inputs/InlineLink'
import { getServerPathname } from '@/helpers/getServerPathname'
import Image from 'next/image'
import Trans from '../translation/Trans'

export default function Footer() {
  const pathname = getServerPathname() as unknown as string

  const isLandingPage = pathname === '/'

  return (
    <footer className="flex flex-col gap-4 bg-primaryLight py-8 pb-32 md:pb-8">
      {isLandingPage && (
        <div className="m-4 flex flex-wrap items-center justify-center gap-4">
          <Image
            src={franceRelanceLogo}
            alt="Logo de France Relance"
            className="mr-2 h-auto w-[5rem]"
            width="96"
            height="86"
          />

          <div className="flex flex-col items-center justify-center font-bold">
            <Image
              src={ueLogo}
              alt="Logo de l'Union Européenne"
              className="mr-2 h-auto w-[5rem]"
              width="96"
              height="86"
            />
            <span>NextGenerationEU</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <InlineLink href="/a-propos">
          <Trans>À propos</Trans>
        </InlineLink>

        <InlineLink
          className="flex items-center justify-center"
          href={'/documentation'}>
          <Trans>Documentation</Trans>
        </InlineLink>

        <InlineLink href="/diffuser">
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
        <InlineLink href="/plan-du-site">
          <Trans i18nKey="publicodes.planDuSite.title">Plan du site</Trans>
        </InlineLink>
      </div>

      <div className="flex w-full items-center justify-center">
        <InlineLink href="/accessibilite" className="text-sm">
          <Trans>Accessibilité : partiellement conforme</Trans>
        </InlineLink>
      </div>
    </footer>
  )
}
