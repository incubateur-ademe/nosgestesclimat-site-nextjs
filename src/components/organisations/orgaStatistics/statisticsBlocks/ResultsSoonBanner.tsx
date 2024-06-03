'use client'

import HourglassIcon from '@/components/icons/HourglassIcon'
import Trans from '@/components/translation/Trans'
import { organisationsDashboardClickShortcutShare } from '@/constants/tracking/pages/organisationsDashboard'
import Card from '@/design-system/layout/Card'
import { useIsOrganisationAdmin } from '@/hooks/organisations/useIsOrganisationAdmin'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'

type Props = {
  hasLessThan3Participants: boolean
}

export default function ResultsSoonBanner({ hasLessThan3Participants }: Props) {
  const pathname = usePathname()

  const { isAdmin } = useIsOrganisationAdmin()

  const isResultatsDetailles = pathname.includes('resultats-detailles')

  function handleScrollIntoView(id: string) {
    const shareSection = document.getElementById(id)

    shareSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    if (!shareSection) return

    shareSection.style.backgroundColor = '#E8DFEE'

    setTimeout(() => {
      shareSection.style.backgroundColor = '#FFFFFF'
    }, 700)
  }

  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full p-10 pb-0">
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-white opacity-50" />

      <Card className="w-full flex-row flex-wrap items-center justify-between gap-4 p-4 md:flex-nowrap">
        <div className="flex max-w-2xl gap-4">
          <HourglassIcon className="fill-primary-700" width="80" height="60" />
          <div className="flex items-center">
            {isAdmin ? (
              <p className="mb-0">
                <span>
                  <Trans>
                    Partagez le test pour obtenir vos premiers résultats.
                  </Trans>
                </span>
                {hasLessThan3Participants && (
                  <span>
                    {' '}
                    <Trans>
                      (Données consultables à partir de 3 participants, dans un
                      souci d'anonymat)
                    </Trans>
                  </span>
                )}
              </p>
            ) : (
              <p className="mb-0">
                <Trans>
                  Données consultables à partir de 3 participants, dans un souci
                  d'anonymat.
                </Trans>
              </p>
            )}
          </div>
        </div>
        {!isResultatsDetailles && (
          <button
            className="whitespace-nowrap font-bold text-primary-700 underline"
            onClick={() => {
              handleScrollIntoView('orga-partage')
              trackEvent(organisationsDashboardClickShortcutShare)
            }}>
            Partagez le test
          </button>
        )}
      </Card>
    </div>
  )
}
