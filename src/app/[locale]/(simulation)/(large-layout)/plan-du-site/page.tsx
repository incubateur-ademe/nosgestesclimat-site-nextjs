import Trans from '@/components/translation/trans/TransServer'
import { linkToGroupCreation } from '@/constants/group'
import { SIMULATOR_PATH } from '@/constants/urls/paths'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import Actions from './_components/Actions'
import LinkList from './_components/LinkList'

export const generateMetadata = getCommonMetadata({
  title: t('Plan du site - Nos Gestes Climat'),
  description: t(
    'Retrouvez toutes les pages du site nosgestesclimat.fr pour calculer votre empreinte carbone.'
  ),
  alternates: {
    canonical: '/plan-du-site',
  },
})

export default async function PlanDuSitePage({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  const links = {
    'Nos outils': {
      bilan: {
        title: t('Le test'),
        href: SIMULATOR_PATH,
      },
      profil: {
        title: t('Votre profil'),
        href: '/profil',
      },
      actions: {
        title: t('Nos actions pour réduire votre empreinte'),
        href: '/actions',
      },
    },
    'Comparez votre empreinte': {
      organisation: {
        title: t('Au sein de votre organisation'),
        href: '/organisations',
      },
      amis: {
        title: t(`Dans un groupe d'amis`),
        href: linkToGroupCreation,
      },
    },
    Informations: {
      Blog: {
        title: t('Blog'),
        href: '/blog',
      },
      thematicLandingPagesAlimentation: {
        title: t("L'empreinte carbone de l'alimentation"),
        href: '/themes/empreinte-carbone-alimentation',
      },
      thematicLandingPagesTransport: {
        title: t("L'empreinte carbone du transport"),
        href: '/themes/empreinte-carbone-transport',
      },
      thematicLandingPagesLogement: {
        title: t("L'empreinte carbone du logement"),
        href: '/themes/empreinte-carbone-logement',
      },
      nouveautes: {
        title: t('Nouveautés'),
        href: '/nouveautes',
      },
      aPropos: {
        title: t('À propos'),
        href: '/a-propos',
      },
      contact: {
        title: t('Contact'),
        href: '/contact',
      },
      legalMentions: {
        title: t('Mentions légales'),
        href: '/mentions-legales',
      },
      legalMentionsBaseEmpreinte: {
        title: t('Conditions d’utilisation des données « Base Empreinte »'),
        href: '/mentions-legales-base-empreinte',
      },
      privacyPolicy: {
        title: t('Politique de confidentialité'),
        href: '/politique-de-confidentialite',
      },
      partenaires: {
        title: t('Partenaires'),
        href: '/partenaires',
      },
      faq: {
        title: t('FAQ'),
        href: '/questions-frequentes',
      },
      stats: {
        title: t('Statistiques'),
        href: '/stats',
      },
    },
    Documentations: {
      modele: {
        title: t('Le modèle Nos Gestes Climat'),
        href: '/modele',
      },
      documentation: {
        title: t('Documentation'),
        href: '/documentation',
      },
    },
  }

  return (
    <div data-cypress-id="plan-links" className="mb-12">
      <Title
        title={
          <Trans locale={locale} i18nKey="publicodes.planDuSite.title">
            Plan du site
          </Trans>
        }
      />

      <section className="mb-2">
        <h2 data-cypress-id="plan-outils-title">
          <Trans locale={locale}>Nos outils</Trans>
        </h2>
        <LinkList entries={links['Nos outils']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans locale={locale}>Comparez votre empreinte</Trans>
        </h2>
        <LinkList entries={links['Comparez votre empreinte']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans locale={locale}>Informations</Trans>
        </h2>
        <LinkList entries={links['Informations']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans locale={locale}>Documentations</Trans>
        </h2>
        <LinkList entries={links['Documentations']} />
      </section>

      <section>
        <Actions />
      </section>
    </div>
  )
}
