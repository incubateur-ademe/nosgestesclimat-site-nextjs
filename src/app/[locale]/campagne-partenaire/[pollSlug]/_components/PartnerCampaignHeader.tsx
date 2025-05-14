'use client'

import ChevronLeft from '@/components/icons/ChevronLeft'
import CloseIcon from '@/components/icons/Close'
import Logo from '@/components/misc/Logo'
import LanguageSwitchButton from '@/components/translation/LanguageSwitchButton'
import Button from '@/design-system/buttons/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function PartnerCampaignHeader({
  logoSrc,
}: {
  logoSrc: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const locale = useLocale()
  const isFrench = locale === i18nConfig.defaultLocale

  return (
    <header className="border-b border-gray-200 bg-white shadow-xs">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 p-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
        <div className="order-1 flex items-center gap-3 sm:order-0">
          <Logo size="sm" />

          <CloseIcon />

          <Image
            src={logoSrc}
            className="max-h-12"
            width="100"
            height="40"
            alt=""
          />
        </div>

        {/* Mobile */}
        <div className="block self-end sm:hidden" aria-live="polite">
          <Button
            size="xs"
            lang={isFrench ? 'en' : 'fr'}
            className="-mt-4 mb-1.5 gap-1 px-0 !py-0.5 !ring-offset-0"
            onClick={() => setIsOpen((prevValue) => !prevValue)}
            color="text">
            <Emoji>🌐</Emoji>{' '}
            {isFrench ? 'Change the language' : 'Changer la langue'}{' '}
            <ChevronLeft
              className={twMerge('w-4', isOpen ? 'rotate-90' : '-rotate-90')}
            />
          </Button>

          {isOpen && (
            <LanguageSwitchButton
              className="mb-4 justify-end"
              langButtonsDisplayed={{
                fr: true,
                en: true,
                es: false,
              }}
            />
          )}
        </div>

        {/* Desktop */}
        <div className="hidden sm:block">
          <LanguageSwitchButton
            langButtonsDisplayed={{
              fr: true,
              en: true,
              es: false,
            }}
          />
        </div>
      </div>
    </header>
  )
}
