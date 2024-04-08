'use client'

import SettingsIcon from '@/components/icons/SettingsIcon'
import OrgaStatistics from '@/components/organisations/OrgaStatistics'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import Trans from '@/components/translation/Trans'
import { clickSettingsLinkEvent } from '@/constants/matomo/organisations'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useFetchOrganisation from '../_hooks/useFetchOrganisation'
import NousContacter from './_components/NousContacter'
import OurTools from './_components/OurTools'
import ShareSection from './_components/ShareSection'

export default function OrganisationPage() {
  const { user } = useUser()

  const router = useRouter()

  const { data: organisation, isError } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { data: pollData } = useFetchPollData({
    orgaSlug: organisation?.slug,
  })

  useEffect(() => {
    if (organisation && !organisation.slug) {
      router.push('/organisations/creation')
    }
  }, [organisation, router])

  return (
    <>
      <OrganisationFetchError organisation={organisation} isError={isError} />

      {organisation && (
        <>
          <div className="mb-4 flex flex-wrap justify-between md:flex-nowrap">
            <div>
              <h1>
                <span>
                  <Trans>Bienvenue</Trans>{' '}
                  <span className="text-primary-700">
                    {capitalizeString(organisation?.administrators?.[0]?.name)}
                  </span>
                  ,
                </span>
              </h1>

              <p className="max-w-sm">
                <Trans>Sur l'espace organisation de </Trans>{' '}
                <strong className="!text-primary-600">
                  {organisation?.name}
                </strong>
                .{' '}
                <Trans>
                  Partagez le test à votre réseau et suivez vos statistiques.
                </Trans>
              </p>
            </div>
            <ButtonLink
              href={`/organisations/${organisation?.slug}/parametres`}
              onClick={() => {
                trackEvent(clickSettingsLinkEvent)
              }}
              color="text"
              className="flex items-center self-start">
              <SettingsIcon className="mr-2 fill-primary-700" />

              <Trans>Voir les paramètres</Trans>
            </ButtonLink>
          </div>

          <OrgaStatistics
            funFacts={pollData?.funFacts}
            simulationRecaps={pollData?.simulationRecaps ?? []}
          />

          <ShareSection organisation={organisation} className="mb-8" />

          <OurTools />

          <NousContacter />
        </>
      )}
    </>
  )
}
