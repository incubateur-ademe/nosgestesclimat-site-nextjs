'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import OrgaStatistics from '@/components/organizations/OrgaStatistics'
import OrganizationFetchError from '@/components/organizations/OrganizationFetchError'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Emoji from '@/design-system/utils/Emoji'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { usePathname } from 'next/navigation'
import useFetchOrganization from '../../_hooks/useFetchOrganization'
import NousContacter from './_components/NousContacter'
import OurTools from './_components/OurTools'
import ShareSection from './_components/ShareSection'

export default function OrganizationPage() {
  const pathname = usePathname()

  const { user } = useUser()

  const { data: organization, isError } = useFetchOrganization({
    email: user.email,
  })

  const { data: pollData } = useFetchPollData({
    enabled: !!organization,
  })

  return (
    <>
      <OrganizationFetchError organization={organization} isError={isError} />

      {organization && (
        <>
          <MaxWidthContent className="mb-10 mt-12">
            <div className="flex flex-wrap justify-between md:flex-nowrap">
              <div>
                <h1>
                  <span>
                    <Trans>Bienvenue</Trans>{' '}
                    <span className="text-primary-500">
                      {capitalizeString(
                        organization?.administrators?.[0]?.name
                      )}
                    </span>
                    ,
                  </span>
                </h1>

                <p className="max-w-sm">
                  <Trans>Sur l'espace organisation de </Trans>{' '}
                  <strong className="!text-primary-600">
                    {organization?.name}
                  </strong>
                  .{' '}
                  <Trans>
                    Partagez le test à votre réseau et suivez vos statistiques.
                  </Trans>
                </p>
              </div>
              <ButtonLink
                href={`${pathname}/parametres`}
                color="text"
                className="self-start">
                <Emoji className="mr-2">⚙️</Emoji>
                <Trans>Voir les paramètres</Trans>
              </ButtonLink>
            </div>
          </MaxWidthContent>

          <MaxWidthContent className="mb-8 mt-0">
            <OrgaStatistics
              funFacts={pollData?.funFacts}
              simulationRecaps={pollData?.simulationRecaps ?? []}
            />
          </MaxWidthContent>

          <ShareSection organization={organization} />

          <MaxWidthContent className="mt-12">
            <OurTools />

            <NousContacter />
          </MaxWidthContent>
        </>
      )}
    </>
  )
}
