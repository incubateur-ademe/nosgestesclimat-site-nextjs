'use client'

import CloseIcon from '@/components/icons/Close'
import Logo from '@/components/misc/Logo'
import LanguageSwitchButton from '@/components/translation/LanguageSwitchButton'
import Image from 'next/image'

export default function PartnerCampaignHeader({
  logoSrc,
  title,
}: {
  logoSrc: string
  title: string
}) {
  return (
    <header>
      <div className="mx-auto flex h-20 max-w-5xl justify-between">
        <div>
          <Logo />

          <CloseIcon />

          <Image src={logoSrc} width="200" height="100" alt={title} />
        </div>

        <LanguageSwitchButton
          langButtonsDisplayed={{
            fr: true,
            en: true,
            es: false,
          }}
        />
      </div>
    </header>
  )
}
