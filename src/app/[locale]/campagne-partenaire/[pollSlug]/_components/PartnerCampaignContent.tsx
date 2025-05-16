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
  faqComponent,
}: {
  pollSlug: string
  partnerCampaign: PartnerCampaignType
  partnersComponent: ReactNode
  faqComponent?: ReactNode
}) {
  const { data: pollInfo } = useFetchPublicPoll({
    pollIdOrSlug: pollSlug,
  })

  return (
    <>
      <PartnerCampaignHeader logoSrc={partnerCampaign.logo.url} />
      <Hero
        title={partnerCampaign.title}
        className="pt-8 pb-0 md:pt-16 md:pb-20"
        description={
          <>
            <div
              dangerouslySetInnerHTML={{ __html: partnerCampaign.htmlContent }}
            />

            <ButtonLink
              size="lg"
              className="mt-2 md:mt-10"
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
            width={400}
            height={300}
            className="w-96"
            alt=""
          />
        }
      />

      {faqComponent}

      <div className="mb-10 px-4 md:mb-32 md:px-24 md:py-10">
        {partnersComponent}
      </div>
    </>
  )
}
