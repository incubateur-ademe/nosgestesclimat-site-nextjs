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
} from '@/constants/tracking/layout'
import InlineLink from '@/design-system/inputs/InlineLink'
import { useIframe } from '@/hooks/useIframe'
import { useLocale } from '@/hooks/useLocale'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import Logo from '../misc/Logo'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import TransClient from '../translation/trans/TransClient'

export default function Footer({ className = '' }) {
  const pathname = usePathname()
  const locale = useLocale()

  const { isIframeOnlySimulation } = useIframe()

  if (isIframeOnlySimulation) return null

  const shouldUseWhiteBackground =
    pathname === '/' ||
    pathname === `/${locale}` ||
    pathname.includes('/empreinte-eau') ||
    pathname.includes('/empreinte-carbone') ||
    pathname.includes('/blog')

  return (
    <footer
      className={twMerge(
        'relative bg-gray-100 p-4 !pb-32 sm:p-8',
        className,
        shouldUseWhiteBackground ? 'bg-white' : ''
      )}>
      <div className="md:mx-auto md:max-w-5xl">
        <Logo className="mb-8" onClick={() => trackEvent(footerClickLogo)} />

        <div className="mb-10 flex flex-col flex-wrap justify-start gap-x-16 gap-y-8 pt-4 md:flex-row lg:flex-nowrap">
          <div className="flex flex-col gap-y-2">
            <h3 className="mb-0 text-sm font-bold text-default">
              <TransClient>À propos</TransClient>
            </h3>
            <InlineLink
              href="/a-propos"
              onClick={() => trackEvent(footerClickQuiSommesNous)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Qui sommes-nous</TransClient>
            </InlineLink>

            <InlineLink
              href="/plan-du-site"
              onClick={() => trackEvent(footerClickPlanSite)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Plan du site</TransClient>
            </InlineLink>

            <InlineLink
              href="/contact"
              onClick={() => trackEvent(footerClickContact)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Contact</TransClient>
            </InlineLink>

            <InlineLink
              href="/international"
              onClick={() => trackEvent(footerClickInternational)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>International</TransClient>
            </InlineLink>
          </div>

          <div className="flex flex-col gap-y-2">
            <h3 className="mb-0 text-sm font-bold text-default">
              <TransClient>Diffusion</TransClient>
            </h3>
            <InlineLink
              href="/diffuser"
              onClick={() => trackEvent(footerClickDiffusion)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Diffuser Nos Gestes Climat</TransClient>
            </InlineLink>

            <InlineLink
              href="/organisations"
              onClick={() => trackEvent(footerClickOrganisations)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Organisations</TransClient>
            </InlineLink>

            <InlineLink
              href="/nos-relais"
              onClick={() => trackEvent(footerClickAmbassadeurs)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Relais et partenaires</TransClient>
            </InlineLink>
          </div>

          <div className="flex flex-col gap-y-2">
            <h3 className="mb-0 text-sm font-bold text-default">
              <TransClient>Ressources</TransClient>
            </h3>

            <InlineLink
              href="/blog"
              onClick={() => trackEvent(footerClickBlog)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Blog</TransClient>
            </InlineLink>

            <InlineLink
              href="/documentation"
              onClick={() => trackEvent(footerClickDocumentation)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Documentation</TransClient>
            </InlineLink>

            <InlineLink
              href="/questions-frequentes"
              onClick={() => trackEvent(footerClickFAQ)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>FAQ</TransClient>
            </InlineLink>

            <InlineLink
              href="/nouveautes"
              onClick={() => trackEvent(footerClickNouveautes)}
              className="text-sm text-default no-underline hover:underline">
              <TransClient>Nouveautés</TransClient>
            </InlineLink>

            <InlineLink
              href="https://impactco2.fr"
              target="_blank"
              className="text-sm text-default no-underline hover:underline"
              onClick={() => trackEvent(footerClickImpactco2)}>
              Impact CO2
            </InlineLink>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 md:flex-row md:flex-nowrap">
          <div>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-10">
              <LanguageSwitchButton />
            </div>

            <div className="mt-4 text-xs">
              <InlineLink href="/accessibilite">
                <TransClient>
                  Accessibilité : partiellement conforme
                </TransClient>
              </InlineLink>
              <span className="mx-1 hidden sm:inline"> | </span>
              <br className="md:hidden" />
              <InlineLink href="/mentions-legales">
                <TransClient>Mentions légales</TransClient>
              </InlineLink>
              <span className="mx-1 hidden sm:inline"> | </span>
              <br className="md:hidden" />
              <InlineLink href="/politique-de-confidentialite">
                <TransClient>Politique de confidentialité</TransClient>
              </InlineLink>
              <span className="mx-1 hidden sm:inline"> | </span>
              <br className="md:hidden" />
              <InlineLink href="/politique-des-cookies">
                <TransClient>Politique des cookies</TransClient>
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
    </footer>
  )
}
