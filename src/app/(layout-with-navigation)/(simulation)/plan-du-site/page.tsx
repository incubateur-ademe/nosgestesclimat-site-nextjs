import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'
import LinkList from './_components/LinkList'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Plan du site - Nos Gestes Climat'),
    description: t(
      'Retrouvez toutes les pages du site nosgestesclimat.fr pour calculer votre empreinte carbone.'
    ),
    alternates: {
      canonical: '/plan-du-site',
    },
  })
}

export default async function PlanDuSitePage() {
  const { t } = await getServerTranslation()

  const links = {
    'Nos outils': {
      bilan: {
        title: t('Le test'),
        href: '/simulateur/bilan',
      },
      profil: {
        title: t('Votre profil'),
        href: '/profil',
      },
      personas: {
        title: t('Nos utilisateurs types'),
        href: '/personas',
      },
      actions: {
        title: t('Nos actions pour réduire votre empreinte'),
        href: '/actions',
      },
      actionsPlus: {
        title: t('Les actions phares'),
        href: '/actions-plus',
      },
    },
    Informations: {
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
      viePrivee: {
        title: t('Vie privée'),
        href: '/vie-privee',
      },
      partenaires: {
        title: t('Partenaires'),
        href: '/partenaires',
      },
      faq: {
        title: t('FAQ'),
        href: '/faq',
      },
      stats: {
        title: t('Statistiques'),
        href: '/stats',
      },
      Blog: {
        title: t('Blog'),
        href: '/blog',
      },
    },
    Documentations: {
      guide: {
        title: t('Nos guides thématiques'),
        href: '/documentation/guide',
      },
      modele: {
        title: t('Le modèle Nos Gestes Climat'),
        href: '/documentation/modele',
      },
      documentation: {
        title: t('Documentation'),
        href: '/documentation',
      },
    },
  }

  return (
    <div data-cypress-id="plan-links">
      <Title
        title={
          <Trans i18nKey="publicodes.planDuSite.title">Plan du site</Trans>
        }
      />

      <section className="mb-2">
        <h2 data-cypress-id="plan-outils-title">
          <Trans>Nos outils</Trans>
        </h2>
        <LinkList entries={links['Nos outils']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Informations</Trans>
        </h2>
        <LinkList entries={links['Informations']} />
      </section>

      <section className="mb-2">
        <h2>
          <Trans>Documentations</Trans>
        </h2>
        <LinkList entries={links['Documentations']} />
      </section>

      <section>
        <Actions />
      </section>
    </div>
  )
}
