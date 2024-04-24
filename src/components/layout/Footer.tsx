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
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import Logo from '../misc/Logo'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/Trans'

export default function Footer({ className = '' }) {
  return (
    <footer
      className={twMerge(
        'relative flex flex-col items-center gap-4 bg-gray-100 p-4 !pb-32 sm:p-8 md:mb-0',
        className
      )}>
      <div className="flex w-full items-start gap-12 md:max-w-5xl">
        <Logo
          className="hidden scale-75 lg:block"
          onClick={() => trackEvent(footerClickLogo)}
        />

        <div className="w-full">
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
              href="/ambassadeurs"
              onClick={() => trackEvent(footerClickAmbassadeurs)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Ambassadeurs</Trans>
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
                ▲&nbsp;<Trans>Propulsé par Vercel</Trans>
                <span className="hidden sm:inline"> | </span>
                <br className="md:hidden" />
                <InlineLink
                  href="/accessibilite"
                  className="text-default no-underline hover:underline">
                  <Trans>Accessibilité : partiellement conforme</Trans>
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
