'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import ButtonLink from '../inputs/ButtonLink'

export default function SkipToMainContentLink() {
  const skipToFirstFocusableElement = (elementId: string) => {
    ;(
      document
        .getElementById(elementId)
        ?.querySelector('a, button') as HTMLElement
    )?.focus()
  }

  const skipToElement = (elementId: string) => {
    document.getElementById(elementId)?.focus()
  }

  return (
    <div className="sr-only flex !w-full items-center focus-within:relative focus-within:left-0 focus-within:right-0 focus-within:top-0 focus-within:z-[100000] focus-within:h-auto focus-within:p-2">
      <nav className="flex w-full flex-col items-start gap-2 md:flex-row md:items-center">
        <ButtonLink
          color="secondary"
          href="#contenu"
          onClick={() => skipToFirstFocusableElement('main-content')}
          onKeyDown={onKeyDownHelper(() =>
            skipToFirstFocusableElement('main-content')
          )}
          className="focus:w-auto focus:ring-2 focus:ring-primary-700 focus:ring-offset-[2px]">
          <TransClient>Contenu</TransClient>
        </ButtonLink>

        <ButtonLink
          color="secondary"
          href="#nav-menu"
          onClick={() => skipToElement('nav-first-link')}
          onKeyDown={onKeyDownHelper(() => skipToElement('nav-first-link'))}
          className="focus:w-auto focus:ring-2 focus:ring-primary-700 focus:ring-offset-[2px]">
          <TransClient>Menu</TransClient>
        </ButtonLink>

        <ButtonLink
          color="secondary"
          href="#footer"
          onClick={() => skipToFirstFocusableElement('footer')}
          onKeyDown={onKeyDownHelper(() =>
            skipToFirstFocusableElement('footer')
          )}
          className="focus:w-auto focus:ring-2 focus:ring-primary-700 focus:ring-offset-[2px]">
          <TransClient>Pied de page</TransClient>
        </ButtonLink>
      </nav>
    </div>
  )
}
