'use client'

import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon'
import TransClient from '@/components/translation/trans/TransClient'
import {
  organisationsDashboardClickAteliers,
  organisationsDashboardClickImpactCo2,
  organisationsDashboardDownloadKit,
} from '@/constants/tracking/pages/organisationsDashboard'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import CTACard from './CTACard'

export default function OurTools() {
  const { t } = useClientTranslation()

  return (
    <section>
      <Title tag="h2" title={<TransClient>Nos outils</TransClient>} />

      <div className="col-span-1 mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CTACard
          className="border-2 border-gray-200 px-8"
          overLabel={<TransClient>Communiquez sur la campagne</TransClient>}
          title={<TransClient>Kit de diffusion</TransClient>}
          description={
            <TransClient>
              Logo, affiches et présentations : retrouvez tous les outils pour
              partager Nos Gestes Climat dans ce kit.
            </TransClient>
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
            <TransClient>Accéder au kit</TransClient>
            <ExternalLinkIcon className="stroke-primary-700 ml-2" />
          </ButtonLink>
        </CTACard>

        <CTACard
          className="relative overflow-hidden border-2 border-gray-200 px-8"
          overLabel={<TransClient>Animez un atelier</TransClient>}
          title={<TransClient>Les ressources de l'ABC</TransClient>}
          description={
            <TransClient>
              Organisez des temps d’animation et d’échanges physiques autour de
              Nos Gestes Climat pour fédérer et renforcer la compréhension des
              participants.
            </TransClient>
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
            <TransClient>Accéder aux ressources</TransClient>
            <ExternalLinkIcon className="stroke-primary-700 ml-2" />
          </ButtonLink>
        </CTACard>

        <CTACard
          className="border-2 border-gray-200 px-8"
          overLabel={<TransClient>Valorisez vos données carbone</TransClient>}
          title={<TransClient>Impact CO2</TransClient>}
          description={
            <TransClient>
              Vous souhaitez illustrer une quantité de CO₂e et diffuser les bons
              ordres de grandeur à votre communauté ? Le Comparateur carbone de
              l’ADEME est l’outil qu’il vous faut !
            </TransClient>
          }>
          <ButtonLink
            className="mt-auto w-full justify-center align-bottom"
            color="secondary"
            href="https://impactco2.fr/comparateur?mtm_campaign=ngc-orga"
            target="_blank"
            trackingEvent={organisationsDashboardClickImpactCo2}
            aria-label={t(
              'Découvrez le calculateur, ouvrir dans un nouvel onglet'
            )}>
            <TransClient>Découvrir le calculateur</TransClient>
            <ExternalLinkIcon className="stroke-primary-700 ml-2" />
          </ButtonLink>
        </CTACard>
      </div>
    </section>
  )
}
