'use client'

import { ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../inputs/Button'

export default function BurgerMenu({
  children,
}: {
  children: (closeMenu: () => void) => ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const genericHamburgerLine = `h-[2px] w-6 my-1 bg-default transition ease transform duration-300`
  return (
    <>
      <Button
        color="text"
        onClick={() => setIsOpen((prevValue) => !prevValue)}
        className=" absolute right-4 top-4 z-20 flex h-[44px] w-[44px] flex-col items-center justify-center p-0">
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

      <div
        className={twMerge(
          'fixed right-0 top-0 z-[9] h-screen w-[90vw] translate-x-full bg-grey-100 p-4 pt-16 shadow-md transition-transform duration-300 ease-in-out',
          `${isOpen ? 'opacity-1 translate-x-0' : ''}`
        )}>
        {children(() => setIsOpen(false))}
      </div>
    </>
  )
}
