'use client'

import CloseIcon from '@/components/icons/Close'
import Logo from '@/components/misc/Logo'
import LanguageSwitchButton from '@/components/translation/LanguageSwitchButton'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import Image from 'next/image'
import { useState } from 'react'

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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-1 px-2 py-3 sm:gap-4 sm:px-4 sm:py-3">
        <div className="flex items-center gap-1 sm:gap-3">
          <Logo size="xs" />

          <CloseIcon className="w-4 md:w-10" />

          <Image
            src={logoSrc}
            className="max-h-12 w-12 sm:w-20"
            width="100"
            height="40"
            alt=""
          />
        </div>

        {/* Mobile */}
        <div className="block sm:hidden">
          <LanguageSwitchButton
            langButtonsDisplayed={{
              fr: true,
              en: true,
              es: false,
            }}
            size="xs"
          />
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
