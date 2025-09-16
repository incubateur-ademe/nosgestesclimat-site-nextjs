'use client'

import HourglassIcon from '@/components/icons/HourglassIcon'
import Trans from '@/components/translation/trans/TransClient'
import Card from '@/design-system/layout/Card'
import { useIsOrganisationAdmin } from '@/hooks/organisations/useIsOrganisationAdmin'
import Wave from 'react-wavify'

type Props = { hasLessThan3Participants: boolean }

export default function ResultsSoonBanner({ hasLessThan3Participants }: Props) {
  const { isAdmin } = useIsOrganisationAdmin()

  return (
    <div className="relative col-span-1 sm:col-span-2 lg:col-span-3">
      <div className="absolute top-0 left-0 z-10 h-full w-full p-10 pb-0">
        <div className="absolute top-0 right-0 bottom-0 left-0 -z-10 bg-white opacity-50" />

        <Card className="w-full flex-row flex-wrap items-center justify-between gap-4 p-4 md:flex-nowrap">
          <div className="flex max-w-2xl gap-4">
            <HourglassIcon
              className="fill-primary-700"
              width="80"
              height="60"
            />
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
                        (Données consultables à partir de 3 participants, dans
                        un souci d'anonymat)
                      </Trans>
                    </span>
                  )}
                </p>
              ) : (
                <p className="mb-0">
                  <Trans>
                    Données consultables à partir de 3 participants, dans un
                    souci d'anonymat.
                  </Trans>
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-rainbow-rotation overflow-hidden rounded-xl bg-gray-100 p-8">
          <p className="text-primary-700 text-4xl font-bold">
            8,0 <span className="text-base font-normal">t CO₂e</span>
          </p>
          <p className="text-xl">
            <Trans>Empreinte moyenne</Trans>
          </p>
        </div>

        <div className="relative hidden rounded-xl bg-gray-100 p-8 lg:block">
          <Wave
            fill="#5152D0"
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-full w-full rounded-b-xl"
            options={{ height: 10, amplitude: 20, speed: 0.11, points: 3 }}
          />
          <div className="relative z-10">
            <p className="text-3xl font-bold text-white">
              10 000{' '}
              <span className="text-base font-normal">
                <Trans>litres</Trans>
              </span>
            </p>

            <p className="text-xl text-white">
              <Trans>
                <strong>Empreinte eau</strong> moyenne
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
