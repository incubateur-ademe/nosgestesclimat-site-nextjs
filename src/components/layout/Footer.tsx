'use client'

import Ademe from '@/components/images/partners/Ademe'
import Marianne from '@/components/images/partners/Marianne'
import {
  footerClickAmbassadeurs,
  footerClickBlog,
  footerClickContact,
  footerClickDiffusion,
  footerClickDocumentation,
  footerClickFAQ,
  footerClickImpactco2,
  footerClickInternational,
  footerClickLogo,
  footerClickNouveautes,
  footerClickOrganisations,
  footerClickPlanSite,
  footerClickQuiSommesNous,
  footerClickStats,
} from '@/constants/tracking/layout'
import InlineLink from '@/design-system/inputs/InlineLink'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import LogoLink from '../misc/LogoLink'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/trans/TransClient'

const WHITE_BACKGROUND_PATHS = new Set([
  '/empreinte-eau',
  '/empreinte-carbone',
  '/blog',
  '/organisations',
])

export default function Footer({
  className = '',
  langButtonsDisplayed,
}: {
  className?: string
  langButtonsDisplayed?: LangButtonsConfigType
}) {
  const pathname = usePathname()
  const locale = useLocale()

  const { isIframeOnlySimulation } = useIframe()

  if (isIframeOnlySimulation) return null

  const shouldUseWhiteBackground =
    pathname === '/' ||
    pathname === `/${locale}` ||
    WHITE_BACKGROUND_PATHS.has(pathname) ||
    pathname.includes('/blog')

  return (
    <footer
      id="footer"
      className={twMerge(
        'relative bg-gray-100 p-4 pb-32! sm:p-8',
        className,
        shouldUseWhiteBackground ? 'bg-white' : ''
      )}>
      <div className="md:mx-auto md:max-w-5xl">
        <LogoLink
          className="mb-8"
          onClick={() => trackEvent(footerClickLogo)}
        />

        <div className="mb-10 flex flex-col flex-wrap justify-start gap-x-16 gap-y-8 pt-4 md:flex-row lg:flex-nowrap">
          <div className="flex flex-col gap-y-2">
            <p className="text-default mb-0 text-sm font-bold">
              <Trans>À propos</Trans>
            </p>
            <InlineLink
              href="/a-propos"
              onClick={() => trackEvent(footerClickQuiSommesNous)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Qui sommes-nous</Trans>
            </InlineLink>

            <InlineLink
              href="/plan-du-site"
              onClick={() => trackEvent(footerClickPlanSite)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Plan du site</Trans>
            </InlineLink>

            <InlineLink
              href="/contact"
              onClick={() => trackEvent(footerClickContact)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Contact</Trans>
            </InlineLink>

            <InlineLink
              href="/international"
              onClick={() => trackEvent(footerClickInternational)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>International</Trans>
            </InlineLink>

            <InlineLink
              href="/stats"
              onClick={() => trackEvent(footerClickStats)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Statistiques</Trans>
            </InlineLink>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-default mb-0 text-sm font-bold">
              <Trans>Diffusion</Trans>
            </p>
            <InlineLink
              href="/diffuser"
              onClick={() => trackEvent(footerClickDiffusion)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Diffuser Nos Gestes Climat</Trans>
            </InlineLink>

            <InlineLink
              href="/organisations"
              onClick={() => trackEvent(footerClickOrganisations)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Organisations</Trans>
            </InlineLink>

            <InlineLink
              href="/nos-relais"
              onClick={() => trackEvent(footerClickAmbassadeurs)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Relais et partenaires</Trans>
            </InlineLink>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-default mb-0 text-sm font-bold">
              <Trans>Ressources</Trans>
            </p>

            <InlineLink
              href="/blog"
              onClick={() => trackEvent(footerClickBlog)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Blog</Trans>
            </InlineLink>

            <InlineLink
              href="/documentation"
              onClick={() => trackEvent(footerClickDocumentation)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Documentation</Trans>
            </InlineLink>

            <InlineLink
              href="/questions-frequentes"
              onClick={() => trackEvent(footerClickFAQ)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>FAQ</Trans>
            </InlineLink>

            <InlineLink
              href="/nouveautes"
              onClick={() => trackEvent(footerClickNouveautes)}
              className="text-default text-sm no-underline hover:underline">
              <Trans>Nouveautés</Trans>
            </InlineLink>

            <InlineLink
              href="https://impactco2.fr"
              target="_blank"
              className="text-default text-sm no-underline hover:underline"
              onClick={() => trackEvent(footerClickImpactco2)}>
              Impact CO2
            </InlineLink>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 md:flex-row md:flex-nowrap">
          <div>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-10">
              <LanguageSwitchButton
                langButtonsDisplayed={langButtonsDisplayed}
              />
            </div>

            <div className="mt-4 text-xs">
              <InlineLink href="/accessibilite">
                <Trans>Accessibilité : partiellement conforme</Trans>
              </InlineLink>
              <span aria-hidden="true" className="mx-1 hidden sm:inline">
                |
              </span>
              <br className="md:hidden" />
              <InlineLink href="/mentions-legales">
                <Trans>Mentions légales</Trans>
              </InlineLink>
              <span aria-hidden="true" className="mx-1 hidden sm:inline">
                |
              </span>
              <br className="md:hidden" />
              <InlineLink href="/politique-de-confidentialite">
                <Trans>Politique de confidentialité</Trans>
              </InlineLink>
              <span aria-hidden="true" className="mx-1 hidden sm:inline">
                |
              </span>
              <br className="md:hidden" />
              <InlineLink href="/politique-des-cookies">
                <Trans>Politique des cookies</Trans>
              </InlineLink>
            </div>
          </div>

          <div className="flex gap-4 self-end pb-1">
            <Marianne className="h-auto w-12 md:w-auto" />

            <Link href="https://ademe.fr" target="_blank">
              <Ademe className="h-auto w-10 md:w-auto" />
            </Link>
          </div>
        </div>
      </div>
      <div id="modal" />
    </footer>
  )
}
