'use client'

import CloseIcon from '@/components/icons/Close'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { KeyboardEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../buttons/Button'

export default function BurgerMenu({
  children,
}: {
  children: (args: { closeMenu: () => void; onFocus: () => void }) => ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useClientTranslation()

  const genericHamburgerLine = `h-[2px] w-6 my-1 bg-default transition ease transform duration-300`

  const handleClickElsewhere = (event: MouseEvent) => {
    const burger = document.getElementById('burger-menu')

    if (!burger || burger.contains(event.target as Node)) {
      return
    }

    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickElsewhere)
    }

    if (!isOpen) {
      window.removeEventListener('click', handleClickElsewhere)
    }
  }, [isOpen])

  const handleClickMask = (
    event: MouseEvent | KeyboardEvent<HTMLDivElement>
  ) => {
    event.stopPropagation()
    setIsOpen(false)
  }

  function handleToggleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <div id="burger-menu">
      <div className="absolute top-0 left-0 z-100">
        <>
          {isOpen && (
            <div
              className="fixed top-0 left-0 h-screen w-screen"
              tabIndex={0}
              onClick={handleClickMask as any}
              onKeyDown={handleClickMask}
              role="button"
              aria-label={t('Fermer le menu')}
            />
          )}

          <div
            className={twMerge(
              'pointer-events-none fixed top-0 right-0 z-50 h-screen w-[90vw] max-w-[20rem] translate-x-full bg-white p-4 pt-16 opacity-0 shadow-md transition-all duration-300 ease-in-out',
              isOpen ? 'pointer-events-auto translate-x-0 opacity-100' : ''
            )}>
            <Button
              color="text"
              aria-label={t('Menu déroulant')}
              onClick={handleToggleMenu}
              className={twMerge(
                'absolute top-4 right-4 z-100 flex h-[44px] w-[44px] flex-col items-center justify-center p-0!',
                isOpen ? 'flex' : ''
              )}>
              <CloseIcon />
            </Button>

            {children({
              closeMenu: () => setIsOpen(false),
              onFocus: () => setIsOpen(true),
            })}
          </div>
        </>
      </div>

      <Button
        color="text"
        aria-label={t('Menu déroulant')}
        onClick={handleToggleMenu}
        className={twMerge(
          'absolute top-4 right-4 flex h-[44px] w-[44px] flex-col items-center justify-center p-0!',
          isOpen ? 'hidden' : ''
        )}>
        <div className={genericHamburgerLine} />
        <div className={genericHamburgerLine} />
        <div className={genericHamburgerLine} />
      </Button>
    </div>
  )
}
