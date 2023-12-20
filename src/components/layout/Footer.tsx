import InlineLink from '@/design-system/inputs/InlineLink'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { twMerge } from 'tailwind-merge'
import Logo from '../misc/Logo'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/Trans'

export default function Footer({ className = '' }) {
  return (
    <footer
      className={twMerge(
        'flex flex-col items-center gap-4 bg-grey-100 p-4 pb-32 sm:p-8 md:mb-0 md:pb-24',
        className
      )}>
      <div className="flex w-full items-start gap-12 md:max-w-5xl">
        <Logo className="hidden scale-75 lg:block" />

        <div className="w-full">
          <div className="flex flex-col flex-wrap justify-start gap-6 pt-4 sm:flex-row md:items-center">
            <InlineLink
              href="/nouveautes"
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Nouveautés</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/a-propos"
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Qui sommes-nous ?</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/blog"
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Blog</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/documentation"
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Documentation</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/ambassadeurs"
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Nos ambassadeurs</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/plan-du-site"
              className="font-bold text-default no-underline hover:underline">
              <Trans>Plan du site</Trans>
            </InlineLink>
          </div>

          <div className="mt-6 flex w-full flex-wrap items-baseline gap-2 text-default sm:gap-4 md:mt-4">
            <p className="mb-1 text-sm">
              <Trans>Diffuser le test :</Trans>
            </p>
            <div className="flex flex-wrap gap-6">
              <InlineLink
                href="/diffuser"
                className="font-bold text-default no-underline hover:underline">
                <Emoji className="mr-2">🏢</Emoji>
                <Trans>Dans votre organisation</Trans>
              </InlineLink>

              <InlineLink
                href="/international"
                className="font-bold text-default no-underline hover:underline">
                <Emoji className="mr-2">🌍</Emoji>
                <Trans>À l'international</Trans>
              </InlineLink>
            </div>
          </div>

          <Separator className="mb-0 mt-6 md:mt-4" />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-10">
            <LanguageSwitchButton />
          </div>

          <div className="mt-4 flex w-full flex-wrap gap-6 text-xs">
            <InlineLink
              href="/accessibilite"
              className="text-default no-underline hover:underline">
              <Trans>Accessibilité : partiellement conforme</Trans>
            </InlineLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
