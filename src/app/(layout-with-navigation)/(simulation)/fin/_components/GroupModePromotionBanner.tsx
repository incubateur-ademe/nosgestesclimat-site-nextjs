'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

export default function GroupModePromotionBanner({
  className,
}: {
  className?: string
}) {
  const { t } = useTranslation()

  return (
    <Card
      className={twMerge(
        'w-full flex-row justify-center gap-4 border-none bg-primary-700 pb-0 text-white md:gap-8',
        className
      )}>
      <div className="flex items-end justify-end md:items-center">
        <Image
          src="/images/misc/challenge-v2.png"
          width="150"
          height="150"
          alt={t('Une capture du mode Groupe Nos Gestes Climat.')}
          className="md:rounded-md"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-center pb-4">
        <p className="max-w-sm font-bold">
          <Trans>
            Comparez vos résultats{' '}
            <span className="text-pink-200">avec vos proches</span>
          </Trans>
        </p>

        <ButtonLink color="secondary" href="/amis" className="bg-white">
          <Trans>Créer un groupe</Trans>
        </ButtonLink>
      </div>
    </Card>
  )
}
