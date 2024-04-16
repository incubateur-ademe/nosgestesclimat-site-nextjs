'use client'

import {
  organisationsDashboardClickIframe,
  organisationsDashboardCopyLink,
} from '@/constants/tracking/pages/organisationsDashboard'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CopyInput from '@/design-system/inputs/CopyInput'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'
import CTACard from './CTACard'

export default function ShareSection({
  organisation,
  className,
}: {
  organisation: Organisation
  className?: string
}) {
  return (
    <section
      className={twMerge('rounded-xl bg-gray-100 px-4 py-10', className)}>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:flex-nowrap lg:items-start">
        <CTACard
          id="orga-partage"
          className="rainbow-border lg:w-2/3"
          overLabel={<NGCTrans>Via un lien de partage</NGCTrans>}
          title={<NGCTrans>Partagez le test</NGCTrans>}
          description={
            <NGCTrans>
              Partagez simplement cette page à vos employés, utilisateurs,
              élèves, et suivez leurs résultats
            </NGCTrans>
          }>
          <CopyInput
            textToDisplay={`${window.location.host}/o/${organisation?.slug}/${organisation?.polls[0].slug}`}
            textToCopy={`${window.location.origin}/o/${organisation?.slug}/${organisation?.polls[0].slug}`}
            onClick={() => {
              trackEvent(organisationsDashboardCopyLink)
            }}
          />
        </CTACard>

        <CTACard
          className="lg:w-1/3"
          overLabel={<NGCTrans>Services web et mobiles</NGCTrans>}
          title={<NGCTrans>Intégration en iframe</NGCTrans>}
          description={
            <NGCTrans>
              Intégrez le test sur un article de blog, ou une page dédiée de
              votre site ou application mobile{' '}
            </NGCTrans>
          }>
          <ButtonLink
            target="_blank"
            href="https://accelerateur-transition-ecologique-ademe.notion.site/Int-grer-Nos-Gestes-Climat-en-iframe-abdeb175baf84143922006964d80348c?pvs=25"
            className="-mt-5 self-start py-2 text-base"
            size="sm"
            trackingEvent={organisationsDashboardClickIframe}>
            <NGCTrans>Découvrez le guide</NGCTrans>
          </ButtonLink>
        </CTACard>
      </div>
    </section>
  )
}
