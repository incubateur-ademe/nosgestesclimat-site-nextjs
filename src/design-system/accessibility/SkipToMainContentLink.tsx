'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import Button from '../inputs/Button'

export default function SkipToMainContentLink() {
  const skipToFirstFocusableElement = () => {
    const firstFocusableElement = document
      .getElementById('main-content')
      ?.querySelector('a, button') as HTMLElement
    if (firstFocusableElement) {
      firstFocusableElement.focus()
    }
  }

  return (
    <Button
      color="secondary"
      onClick={skipToFirstFocusableElement}
      onKeyDown={onKeyDownHelper(() => skipToFirstFocusableElement())}
      className="sr-only focus:relative focus:left-0 focus:top-0 focus:z-[100000] focus:h-8 focus:w-auto focus:ring-2 focus:ring-primary-700 focus:ring-offset-[2px]">
      <TransClient>Passer au contenu principal</TransClient>
    </Button>
  )
}
