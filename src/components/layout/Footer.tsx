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
import Separator from '@/design-system/layout/Separator'
import { useLocale } from '@/hooks/useLocale'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import Logo from '../misc/Logo'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/Trans'

export default function Footer({ className = '' }) {
  const pathname = usePathname()
  const locale = useLocale()

  const isHomePage = pathname === '/' || pathname === `/${locale}`
  return (
    <footer
      className={twMerge(
        'relative flex flex-col items-center gap-4 bg-gray-100 p-4 !pb-32 sm:p-8 md:mb-0',
        className,
        isHomePage ? 'bg-white' : ''
      )}>
      <div className="flex w-full items-start gap-12 md:max-w-5xl">
        <Logo onClick={() => trackEvent(footerClickLogo)} />

        <div className="flex-1">
          <div className="flex flex-col flex-wrap justify-start gap-x-5 gap-y-2 pt-4 sm:flex-row md:items-center">
            <InlineLink
              href="/a-propos"
              onClick={() => trackEvent(footerClickQuiSommesNous)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>À propos</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/blog"
              onClick={() => trackEvent(footerClickBlog)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Blog</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/nouveautes"
              onClick={() => trackEvent(footerClickNouveautes)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Nouveautés</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/documentation"
              onClick={() => trackEvent(footerClickDocumentation)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Documentation</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/questions-frequentes"
              onClick={() => trackEvent(footerClickFAQ)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>FAQ</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/contact"
              onClick={() => trackEvent(footerClickContact)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Contact</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/plan-du-site"
              onClick={() => trackEvent(footerClickPlanSite)}
              className="font-bold text-default no-underline hover:underline">
              <Trans>Plan du site</Trans>
            </InlineLink>

            {/* Hack in order to force Diffusion to be on a new line on desktop */}
            <div className="hidden w-full lg:block" />

            <InlineLink
              href="/diffuser"
              onClick={() => trackEvent(footerClickDiffusion)}
              className="font-bold text-default no-underline hover:underline">
              <Trans>Diffusion</Trans>
            </InlineLink>

            <InlineLink
              href="/organisations"
              onClick={() => trackEvent(footerClickOrganisations)}
              className="font-bold text-default no-underline hover:underline">
              <Trans>Organisations</Trans>
            </InlineLink>

            <InlineLink
              href="/nos-relais"
              onClick={() => trackEvent(footerClickAmbassadeurs)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Nos relais</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/international"
              onClick={() => trackEvent(footerClickInternational)}
              className="font-bold text-default no-underline hover:underline">
              <Trans>International</Trans>
            </InlineLink>

            <InlineLink
              href="https://impactco2.fr"
              target="_blank"
              className="font-bold text-default no-underline hover:underline"
              onClick={() => trackEvent(footerClickImpactco2)}>
              Impact CO2
            </InlineLink>
          </div>

          <Separator className="mb-0 mt-6 md:mt-4" />

          <div className="flex flex-wrap justify-between gap-8 md:flex-row md:flex-nowrap">
            <div>
              <div className="mt-6 flex flex-wrap items-start justify-between gap-10">
                <LanguageSwitchButton />
              </div>

              <div className="mt-4 text-xs">
                <InlineLink
                  href="/accessibilite"
                  className="text-default no-underline hover:underline">
                  <Trans>Accessibilité : partiellement conforme</Trans>
                </InlineLink>
                <span className="hidden sm:inline"> | </span>
                <br className="md:hidden" />
                <InlineLink
                  href="/mentions-legales"
                  className="text-default no-underline hover:underline">
                  <Trans>Mentions légales</Trans>
                </InlineLink>
                <span className="hidden sm:inline"> | </span>
                <br className="md:hidden" />
                <InlineLink
                  href="/politique-de-confidentialite"
                  className="text-default no-underline hover:underline">
                  <Trans>Politique de confidentialité</Trans>
                </InlineLink>
                <span className="hidden sm:inline"> | </span>
                <br className="md:hidden" />
                <InlineLink
                  href="/politique-des-cookies"
                  className="text-default no-underline hover:underline">
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
      </div>
    </footer>
  )
}
