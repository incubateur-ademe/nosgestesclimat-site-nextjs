'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import Button from '../inputs/Button'
import ButtonLink from '../inputs/ButtonLink'

export default function SkipToMainContentLink() {
  const skipToFirstFocusableElement = (elementId: string) => {
    const firstFocusableElement = document
      .getElementById(elementId)
      ?.querySelector('a, button') as HTMLElement

    console.log(firstFocusableElement)
    if (firstFocusableElement) {
      firstFocusableElement.focus()
    }
  }

  const skipToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    console.log(element)
    if (element) {
      element.focus()
    }
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

        <Button
          color="secondary"
          onClick={() => skipToElement('nav-first-link')}
          onKeyDown={onKeyDownHelper(() => skipToElement('nav-first-link'))}
          className="focus:w-auto focus:ring-2 focus:ring-primary-700 focus:ring-offset-[2px]">
          <TransClient>Menu</TransClient>
        </Button>

        <Button
          color="secondary"
          onClick={() => skipToFirstFocusableElement('footer')}
          onKeyDown={onKeyDownHelper(() =>
            skipToFirstFocusableElement('footer')
          )}
          className="focus:w-auto focus:ring-2 focus:ring-primary-700 focus:ring-offset-[2px]">
          <TransClient>Pied de page</TransClient>
        </Button>
      </nav>
    </div>
  )
}
