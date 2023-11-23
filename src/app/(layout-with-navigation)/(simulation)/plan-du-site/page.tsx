import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'
import LinkList from './_components/LinkList'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Plan du site - Nos Gestes Climat',
    description:
      'Retrouvez toutes les pages du site nosgestesclimat.fr pour calculer votre empreinte carbone.',
  })
}

export default async function PlanDuSitePage() {
  const { t } = await getServerTranslation()

  const links = {
    'Nos outils': {
      bilan: {
        title: t('Le test', 'publicodes.planDuSite.bilan'),
        href: '/simulateur/bilan',
      },
      profil: {
        title: t('Votre profil', 'publicodes.planDuSite.profil'),
        href: '/profil',
      },
      personas: {
        title: t('Nos utilisateurs types', 'publicodes.planDuSite.personas'),
        href: '/personas',
      },
      actions: {
        title: t(
          'Nos actions pour réduire votre empreinte',
          'publicodes.planDuSite.actions'
        ),
        href: '/actions',
      },
      actionsPlus: {
        title: t('Les actions phares', 'publicodes.planDuSite.actionsPlus'),
        href: '/actions-plus',
      },
    },
    Informations: {
      nouveautes: {
        title: t('Nouveautés', 'publicodes.planDuSite.nouveautes'),
        href: '/nouveautes',
      },
      aPropos: {
        title: t('À propos', 'publicodes.planDuSite.aPropos'),
        href: '/a-propos',
      },
      contact: {
        title: t('Contact', 'publicodes.planDuSite.contact'),
        href: '/contact',
      },
      viePrivee: {
        title: t('Vie privée', 'publicodes.planDuSite.viePrivee'),
        href: '/vie-privee',
      },
      partenaires: {
        title: t('Partenaires', 'publicodes.planDuSite.partenaires'),
        href: '/partenaires',
      },
      faq: {
        title: t('FAQ'),
        href: '/faq',
      },
      stats: {
        title: t('Statistiques', 'publicodes.planDuSite.stats'),
        href: '/stats',
      },
      Blog: {
        title: t('Blog', 'publicodes.planDuSite.blog'),
        href: '/blog',
      },
    },
    Documentations: {
      guide: {
        title: t('Nos guides thématiques', 'publicodes.planDuSite.guide'),
        href: '/documentation/guide',
      },
      modele: {
        title: t('Le modèle Nos Gestes Climat', 'publicodes.planDuSite.modele'),
        href: '/documentation/modele',
      },
      documentation: {
        title: t('Documentation', 'publicodes.planDuSite.documentation'),
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
        <h2>
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
        <h2>
          <Trans i18nKey="publicodes.planDuSite.actionsPlus">Les actions</Trans>
        </h2>
        <Actions />
      </section>
    </div>
  )
}
