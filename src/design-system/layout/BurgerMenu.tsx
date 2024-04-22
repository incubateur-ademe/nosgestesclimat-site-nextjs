'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { KeyboardEvent, ReactNode, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../inputs/Button'

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
      <Button
        color="text"
        onClick={handleToggleMenu}
        className="absolute right-4 top-4 z-[52] flex h-[44px] w-[44px] flex-col items-center justify-center !p-0">
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? 'translate-y-2 rotate-45 ' : ''
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${isOpen ? 'opacity-0' : ''}`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? '-translate-y-3 -rotate-45 ' : ''
          }`}
        />
      </Button>

      <div className="fixed left-0 top-0 z-[51]">
        <>
          {isOpen && (
            <div
              className="fixed left-0 top-0 h-screen w-screen"
              tabIndex={0}
              onClick={handleClickMask as any}
              onKeyDown={handleClickMask}
              role="button"
              aria-label={t('Fermer le menu')}
            />
          )}

          <div
            className={twMerge(
              'fixed right-0 top-0 z-[51] h-screen w-[90vw] max-w-[20rem] translate-x-full bg-white p-4 pt-16 opacity-0 shadow-md transition-all duration-300 ease-in-out',
              isOpen ? 'opacity-1  translate-x-0' : ''
            )}>
            {children({
              closeMenu: () => setIsOpen(false),
              onFocus: () => setIsOpen(true),
            })}
          </div>
        </>
      </div>
    </div>
  )
}
