'use client'

import {
  organisationsDashboardClickAteliers,
  organisationsDashboardClickImpactCo2,
  organisationsDashboardDownloadKit,
} from '@/constants/tracking/pages/organisationsDashboard'
import ExternalLinkIcon from '@/design-system/icons/ExternalLinkIcon'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import CTACard from './CTACard'

export default function OurTools() {
  const { t } = useClientTranslation()

  return (
    <section>
      <Title tag="h2" title={<NGCTrans>Nos outils</NGCTrans>} />

      <div className="col-span-1 mt-8 grid  grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CTACard
          className="border-2 border-gray-200 px-8"
          overLabel={<NGCTrans>Partagez Nos Gestes Climat</NGCTrans>}
          title={<NGCTrans>Kit de diffusion</NGCTrans>}
          description={
            <NGCTrans>
              Logo, affiches et présentations : retrouvez tous les outils pour
              partager Nos Gestes Climat dans ce kit.
            </NGCTrans>
          }>
          <ButtonLink
            onClick={() => {
              trackEvent(organisationsDashboardDownloadKit)
            }}
            className="mt-auto w-full justify-center align-bottom"
            color="secondary"
            href="https://drive.google.com/drive/folders/1ppvieBBNCSSkvREGIAAK44PmPNy9CRz9?usp=drive_link"
            target="_blank"
            aria-label={t('Télécharger le kit, ouvrir dans un nouvel onglet')}>
            <NGCTrans>Télécharger le kit</NGCTrans>
            <ExternalLinkIcon className="ml-2 stroke-primary-700" />
          </ButtonLink>
        </CTACard>

        <CTACard
          className="relative overflow-hidden border-2 border-gray-200 px-8"
          overLabel={<NGCTrans>Animez un atelier</NGCTrans>}
          title={<NGCTrans>Les ateliers de l'ABC</NGCTrans>}
          description={
            <NGCTrans>
              Organisez des temps d’animation et d’échanges physiques autour de
              Nos Gestes Climat pour fédérer et renforcer la compréhension des
              participants.
            </NGCTrans>
          }>
          <ButtonLink
            color="secondary"
            trackingEvent={organisationsDashboardClickAteliers}
            className="mt-auto w-full justify-center"
            href="https://drive.google.com/drive/folders/1dORmBbDLDG31PLLOblP8Wg5CrrksAfjV"
            target="_blank"
            aria-label={t(
              'Découvrez les ateliers de l’ABC, ouvrir dans un nouvel onglet'
            )}>
            <NGCTrans>Accéder au kit</NGCTrans>
            <ExternalLinkIcon className="ml-2 stroke-primary-700" />
          </ButtonLink>
        </CTACard>

        <CTACard
          className="border-2 border-gray-200 px-8"
          overLabel={<NGCTrans>Valorisez vos données carbone</NGCTrans>}
          title={<NGCTrans>Impact CO2</NGCTrans>}
          description={
            <NGCTrans>
              Vous souhaitez illustrer une quantité de CO2e et diffuser les bons
              ordres de grandeur à votre communauté ? Le Comparateur carbone de
              l’ADEME est l’outil qu’il vous faut !
            </NGCTrans>
          }>
          <ButtonLink
            className="mt-auto w-full justify-center align-bottom"
            color="secondary"
            href="https://impactco2.fr/comparateur?mtm_campaign=ngc-orga"
            target="_blank"
            trackingEvent={organisationsDashboardClickImpactCo2}
            aria-label={t(
              'Découvrez le simulateur, ouvrir dans un nouvel onglet'
            )}>
            <NGCTrans>Découvrir le simulateur</NGCTrans>
            <ExternalLinkIcon className="ml-2 stroke-primary-700" />
          </ButtonLink>
        </CTACard>
      </div>
    </section>
  )
}
