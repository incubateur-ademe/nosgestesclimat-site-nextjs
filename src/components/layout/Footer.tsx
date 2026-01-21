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
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { useCookieConsent } from '../cookies/CookieConsentProvider'
import Link from '../Link'
import LogoLink from '../misc/LogoLink'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/trans/TransClient'
import WantToActBlock from './footer/WantToActBlock'
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
        <div className="mb-8 flex items-center justify-between">
          <LogoLink onClick={() => trackEvent(footerClickLogo)} />

          <LanguageSwitchButton langButtonsDisplayed={langButtonsDisplayed} />
        </div>

        <div className="my-4 block md:hidden">
          <WantToActBlock />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mb-10 flex flex-col flex-wrap justify-start gap-x-16 gap-y-8 pt-4 md:flex-row">
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
                    onClick={() => trackEvent(footerClickQuiSommesNous)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Qui sommes-nous</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/plan-du-site"
                    onClick={() => trackEvent(footerClickPlanSite)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Plan du site</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/contact"
                    onClick={() => trackEvent(footerClickContact)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Contact</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/international"
                    onClick={() => trackEvent(footerClickInternational)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>International</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/stats"
                    onClick={() => trackEvent(footerClickStats)}
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
                    onClick={() => trackEvent(footerClickDiffusion)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Diffuser Nos Gestes Climat</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/organisations"
                    onClick={() => trackEvent(footerClickOrganisations)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Organisations</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/nos-relais"
                    onClick={() => trackEvent(footerClickAmbassadeurs)}
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
                    onClick={() => trackEvent(footerClickBlog)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Blog</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/documentation"
                    onClick={() => trackEvent(footerClickDocumentation)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Documentation</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/questions-frequentes"
                    onClick={() => trackEvent(footerClickFAQ)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>FAQ</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="/nouveautes"
                    onClick={() => trackEvent(footerClickNouveautes)}
                    className="text-default text-sm no-underline hover:underline">
                    <Trans>Nouveautés</Trans>
                  </InlineLink>
                </li>
                <li>
                  <InlineLink
                    href="https://impactco2.fr"
                    target="_blank"
                    className="text-default text-sm no-underline hover:underline"
                    onClick={() => trackEvent(footerClickImpactco2)}>
                    Impact CO2
                  </InlineLink>
                </li>
              </ul>
            </div>

            <ThematicPagesSection />
          </div>
          <div className="hidden md:block">
            <WantToActBlock />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 border-t border-gray-200 pt-6 md:flex-row md:flex-nowrap">
          <div>
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
