'use client'

import {
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import {
  type DropdownMenuItemClassNameProps,
  getDropdownMenuItemClassName,
} from './dropdownMenu/helpers'
import {
  type DropdownMenuButtonRef,
  useDropdownMenu,
} from './dropdownMenu/useDropdownMenu'

export interface DropdownMenuTriggerProps {
  isOpen: boolean
  buttonRef: DropdownMenuButtonRef
  buttonId: string
  panelId: string
  onToggle: () => void
}

interface Props {
  trigger: (props: DropdownMenuTriggerProps) => ReactNode
  children: (props: {
    closeMenu: () => void
    getItemClassName: (options: DropdownMenuItemClassNameProps) => string
  }) => ReactNode
  panelClassName?: string
  align?: 'left' | 'right'
  onToggle?: (isOpen: boolean) => void
}

const PANEL_OFFSET = 8

export default function DropdownMenu({
  trigger,
  children,
  panelClassName,
  align = 'right',
  onToggle,
}: Props) {
  const {
    isOpen,
    closeMenu,
    toggleMenu,
    buttonRef,
    panelRef,
    buttonId,
    panelId,
  } = useDropdownMenu({ onToggle })

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [panelPosition, setPanelPosition] = useState<{
    top: number
    left?: number
    right?: number
  } | null>(null)

  const measurePanelPosition = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const rect = wrapper.getBoundingClientRect()
    const next: { top: number; left?: number; right?: number } = {
      top: rect.bottom + PANEL_OFFSET,
      ...(align === 'right'
        ? { right: window.innerWidth - rect.right }
        : { left: rect.left }),
    }

    setPanelPosition((prev) => {
      if (!prev) return next

      return prev.top === next.top &&
        prev.right === next.right &&
        prev.left === next.left
        ? prev
        : next
    })
  }, [align])

  // Trigger the positionning of the panel
  useLayoutEffect(() => {
    if (isOpen) {
      measurePanelPosition()
    }
  }, [isOpen, measurePanelPosition])

  useEffect(() => {
    if (!isOpen) return

    window.addEventListener('resize', measurePanelPosition)
    window.addEventListener('scroll', measurePanelPosition, true)

    return () => {
      window.removeEventListener('resize', measurePanelPosition)
      window.removeEventListener('scroll', measurePanelPosition, true)
    }
  }, [isOpen, measurePanelPosition])

  return (
    <div ref={wrapperRef} className="relative inline-block">
      {trigger({
        isOpen,
        buttonRef,
        buttonId,
        panelId,
        onToggle: toggleMenu,
      })}

      {isOpen &&
        panelPosition &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            aria-labelledby={buttonId}
            style={{
              position: 'fixed',
              top: panelPosition.top,
              ...(align === 'right'
                ? { right: panelPosition.right }
                : { left: panelPosition.left }),
              zIndex: 1000,
            }}
            className={twMerge(
              'min-w-3 overflow-hidden rounded-lg border border-slate-100 bg-white shadow-md',
              panelClassName
            )}>
            <ul className="m-0 list-none p-0">
              {children({
                closeMenu,
                getItemClassName: getDropdownMenuItemClassName,
              })}
            </ul>
          </div>,
          document.body
        )}
    </div>
  )
}
