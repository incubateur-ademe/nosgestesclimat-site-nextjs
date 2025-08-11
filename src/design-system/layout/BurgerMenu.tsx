'use client'

import CloseIcon from '@/components/icons/Close'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { KeyboardEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
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

  const openButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleClickMask = (event: MouseEvent) => {
    event.stopPropagation()
    setIsOpen(false)
  }

  function handleToggleMenu() {
    setIsOpen((prev) => !prev)
  }

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Move focus to the panel for screen readers
      requestAnimationFrame(() => {
        panelRef.current?.focus()
      })
    } else {
      document.body.style.overflow = 'auto'
      // Return focus to the toggle button
      openButtonRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handlePanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      return
    }

    if (event.key !== 'Tab') return

    const panel = panelRef.current
    if (!panel) return

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input[type="text"]:not([disabled])',
      'input[type="radio"]:not([disabled])',
      'input[type="checkbox"]:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

    if (focusable.length === 0) {
      // Keep focus on panel if nothing focusable
      event.preventDefault()
      panel.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey) {
      if (active === first || active === panel) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (active === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <div id="burger-menu">
      <Button
        color="text"
        aria-label={isOpen ? t('Fermer le menu') : t('Ouvrir le menu')}
        aria-expanded={isOpen}
        aria-controls="burger-menu-panel"
        onClick={handleToggleMenu}
        ref={openButtonRef}
        className={twMerge(
          'focus:ring-primary-700 absolute top-4 right-4 flex h-[44px] w-[44px] flex-col items-center justify-center p-0! focus:ring-2 focus:ring-offset-3 focus:outline-hidden',
          isOpen ? 'hidden' : ''
        )}>
        <div className={genericHamburgerLine} />
        <div className={genericHamburgerLine} />
        <div className={genericHamburgerLine} />
      </Button>
      <div className="absolute top-0 left-0 z-100">
        <>
          {isOpen && (
            <div
              className="fixed top-0 left-0 h-screen w-screen"
              aria-hidden="true"
              onClick={handleClickMask as any}
            />
          )}

          <div
            className={twMerge(
              'pointer-events-none fixed top-0 right-0 z-50 h-screen w-[90vw] max-w-[20rem] translate-x-full bg-white p-4 pt-16 opacity-0 shadow-md transition-all duration-300 ease-in-out',
              isOpen ? 'pointer-events-auto translate-x-0 opacity-100' : ''
            )}
            id="burger-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="burger-menu-title"
            tabIndex={-1}
            ref={panelRef}
            onKeyDown={handlePanelKeyDown}>
            <h2 id="burger-menu-title" className="sr-only">
              {t('common.burgerMenu.title', 'Menu de navigation')}
            </h2>
            <Button
              color="text"
              aria-label={t('Fermer le menu')}
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
    </div>
  )
}
