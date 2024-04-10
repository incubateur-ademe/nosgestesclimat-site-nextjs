'use client'

import Trans from '@/components/translation/Trans'
import { endClickCreateGroup } from '@/constants/tracking/pages/end'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export default function GroupModePromotionBanner({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()

  return (
    <Card
      className={twMerge(
        'w-full flex-row justify-center gap-4 border-2 border-blue-default bg-blue-light md:gap-8',
        className
      )}>
      <div className="flex min-w-24 items-center justify-end">
        <Image
          src="/images/misc/amis-screenshot.svg"
          width="200"
          height="300"
          alt={t('Une capture du mode Groupe Nos Gestes Climat.')}
          className="md:rounded-md"
        />
      </div>

      <div className="flex flex-1 flex-col items-start justify-center pb-4">
        <p className="max-w-sm font-bold">
          <Trans>
            Comparez vos résultats{' '}
            <span className="text-blue-dark">avec vos proches</span>
          </Trans>
        </p>

        <ButtonLink
          color="secondary"
          href="/amis"
          trackingEvent={endClickCreateGroup}>
          <Trans>Créer un groupe</Trans>
        </ButtonLink>
      </div>
    </Card>
  )
}
