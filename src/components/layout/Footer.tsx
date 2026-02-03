'use client'

import Ademe from '@/components/images/partners/Ademe'
import Marianne from '@/components/images/partners/Marianne'
import {
  trackFooterClickAmbassadeurs,
  trackFooterClickBlog,
  trackFooterClickContact,
  trackFooterClickDiffusion,
  trackFooterClickDocumentation,
  trackFooterClickFAQ,
  trackFooterClickImpactco2,
  trackFooterClickInternational,
  trackFooterClickLogo,
  trackFooterClickNouveautes,
  trackFooterClickOrganisations,
  trackFooterClickPlanSite,
  trackFooterClickQuiSommesNous,
  trackFooterClickStats,
} from '@/constants/tracking/layout'
import InlineLink from '@/design-system/inputs/InlineLink'
import type { LangButtonsConfigType } from '@/helpers/language/getLangButtonsDisplayed'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useCookieConsent } from '../cookies/CookieConsentProvider'
import Link from '../Link'
import LogoLink from '../misc/LogoLink'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/trans/TransClient'
import ThematicPagesSection from './ThematicPagesSection'

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

  const { t } = useClientTranslation()

  const { setIsBoardOpen } = useCookieConsent()

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
      tabIndex={-1}
      role="contentinfo"
      className={twMerge(
        'relative bg-gray-100 p-4 pb-32! sm:p-8',
        className,
        shouldUseWhiteBackground ? 'bg-white' : ''
      )}>
      <div className="md:mx-auto md:max-w-5xl">
        <LogoLink className="mb-8" onClick={trackFooterClickLogo} />

        <div className="mb-10 flex flex-col flex-wrap justify-start gap-x-16 gap-y-8 pt-4 md:flex-row lg:flex-nowrap">
          <div className="flex flex-col gap-y-2">
            <p
              id="about-section"
              className="text-default mb-0 text-sm font-bold">
              <Trans>À propos</Trans>
            </p>
            <ul aria-labelledby="about-section">
              <li>
                <InlineLink
                  href="https://beta.gouv.fr/startups/nosgestesclimat.html"
                  target="_blank"
                  aria-label={t('Qui sommes-nous - Nouvelle fenêtre')}
                  rel="noopener noreferrer"
                  onClick={trackFooterClickQuiSommesNous}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Qui sommes-nous</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/plan-du-site"
                  onClick={trackFooterClickPlanSite}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Plan du site</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/contact"
                  onClick={trackFooterClickContact}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Contact</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/international"
                  onClick={trackFooterClickInternational}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>International</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/stats"
                  onClick={trackFooterClickStats}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Statistiques</Trans>
                </InlineLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-2">
            <p
              id="diffusion-section"
              className="text-default mb-0 text-sm font-bold">
              <Trans>Diffusion</Trans>
            </p>
            <ul aria-labelledby="diffusion-section">
              <li>
                <InlineLink
                  href="/diffuser"
                  onClick={trackFooterClickDiffusion}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Diffuser Nos Gestes Climat</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/organisations"
                  data-testid="organisations-link"
                  onClick={trackFooterClickOrganisations}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Organisations</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/nos-relais"
                  onClick={trackFooterClickAmbassadeurs}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Relais et partenaires</Trans>
                </InlineLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-2">
            <p
              id="resources-section"
              className="text-default mb-0 text-sm font-bold">
              <Trans>Ressources</Trans>
            </p>
            <ul aria-labelledby="resources-section">
              <li>
                <InlineLink
                  href="/blog"
                  onClick={trackFooterClickBlog}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Blog</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/documentation"
                  onClick={trackFooterClickDocumentation}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Documentation</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/questions-frequentes"
                  onClick={trackFooterClickFAQ}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>FAQ</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="/nouveautes"
                  onClick={trackFooterClickNouveautes}
                  className="text-default text-sm no-underline hover:underline">
                  <Trans>Nouveautés</Trans>
                </InlineLink>
              </li>
              <li>
                <InlineLink
                  href="https://impactco2.fr"
                  target="_blank"
                  className="text-default text-sm no-underline hover:underline"
                  onClick={trackFooterClickImpactco2}>
                  Impact CO2
                </InlineLink>
              </li>
            </ul>
          </div>

          <ThematicPagesSection />
        </div>

        <div className="flex flex-wrap justify-between gap-8 md:flex-row md:flex-nowrap">
          <div>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-10">
              <LanguageSwitchButton
                langButtonsDisplayed={langButtonsDisplayed}
              />
            </div>

            <div className="mt-4 text-xs">
              <ul>
                <li className="block md:inline">
                  <InlineLink href="/accessibilite">
                    <Trans>Accessibilité : partiellement conforme</Trans>
                  </InlineLink>
                  <span aria-hidden="true" className="mx-1 hidden sm:inline">
                    |
                  </span>
                </li>
                <li className="block md:inline">
                  <InlineLink href="/mentions-legales">
                    <Trans>Mentions légales</Trans>
                  </InlineLink>
                  <span aria-hidden="true" className="mx-1 hidden sm:inline">
                    |
                  </span>
                </li>
                <li className="block md:inline">
                  <InlineLink href="/politique-de-confidentialite">
                    <Trans>Politique de confidentialité</Trans>
                  </InlineLink>
                  <span aria-hidden="true" className="mx-1 hidden sm:inline">
                    |
                  </span>
                </li>
                <li className="block md:inline">
                  <button
                    data-testid="cookie-footer-button"
                    className="text-primary-700 focus:ring-primary-700 text-xs underline focus:ring-2 focus:ring-offset-3 focus:outline-hidden"
                    onClick={() => setIsBoardOpen(true)}>
                    <Trans>Gestion des cookies</Trans>
                  </button>
                </li>
              </ul>
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
