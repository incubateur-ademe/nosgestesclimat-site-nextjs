'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { PropsWithChildren, useState } from 'react'

export default function BurgerMenu({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useClientTranslation()

  return (
    <>
      <div className="burger-menu relative">
        <input
          className="absolute left-0 top-0 h-[32px] w-[32px] opacity-0"
          type="checkbox"
          name=""
          id=""
          aria-label={t('Ouvrir le menu de navigation')}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="burger-menu absolute left-0 top-0 flex h-[26px] w-[32px] flex-col justify-between">
          <span className="bg-default line1 h-[4px] w-full"></span>
          <span className="bg-default line2 h-[4px] w-full"></span>
          <span className="bg-default line3 h-[4px] w-full"></span>
        </div>
      </div>
      <div className={`${isOpen ? 'open' : ''}`}>{children}</div>
    </>
  )
}
