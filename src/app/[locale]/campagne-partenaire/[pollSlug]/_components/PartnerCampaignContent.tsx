'use client'

import type { PartnerCampaignType } from '@/adapters/cmsClient'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import Hero from '@/design-system/layout/landingPage/Hero'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import Image from 'next/image'
import type { ReactNode } from 'react'
import PartnerCampaignHeader from './PartnerCampaignHeader'

export default function PartnerCampaignContent({
  pollSlug,
  partnerCampaign,
  partnersComponent,
}: {
  pollSlug: string
  partnerCampaign: PartnerCampaignType
  partnersComponent: ReactNode
}) {
  const { data: pollInfo } = useFetchPublicPoll({
    pollIdOrSlug: pollSlug,
  })

  return (
    <>
      <PartnerCampaignHeader logoSrc={partnerCampaign.logo.url} />
      <Hero
        title={partnerCampaign.title}
        description={
          <>
            <div
              dangerouslySetInnerHTML={{ __html: partnerCampaign.htmlContent }}
            />

            <ButtonLink
              size="lg"
              className="mt-8"
              href={`/o/${pollInfo?.organisation?.slug}/${pollSlug}`}>
              {partnerCampaign.labelCTA}
            </ButtonLink>

            <Image
              src={
                partnerCampaign.image?.url ??
                '/images/illustrations/girl-holding-earth.svg'
              }
              width={300}
              height={300}
              className="mx-auto mt-6 block text-center md:hidden"
              alt=""
            />
          </>
        }
        illustration={
          <Image
            src={
              partnerCampaign.image?.url ??
              '/images/illustrations/girl-holding-earth.svg'
            }
            width={300}
            height={300}
            className="w-96"
            alt=""
          />
        }
        partners={partnersComponent}
      />
    </>
  )
}
