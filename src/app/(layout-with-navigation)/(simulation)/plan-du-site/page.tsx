import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
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

const links = {
  'Nos outils': {
    bilan: {
      title: 'Le test',
      href: '/simulateur/bilan',
    },
    profil: {
      title: 'Votre profil',
      href: '/profil',
    },
    personas: {
      title: 'Nos utilisateurs types',
      href: '/personas',
    },
    actions: {
      title: 'Nos actions pour réduire votre empreinte',
      href: '/actions',
    },
    actionsPlus: {
      title: 'Les actions phares',
      href: '/actions-plus',
    },
  },
  Informations: {
    nouveautes: {
      title: 'Nouveautés',
      href: '/nouveautes',
    },
    aPropos: {
      title: 'À propos',
      href: '/a-propos',
    },
    contact: {
      title: 'Contact',
      href: '/contact',
    },
    viePrivee: {
      title: 'Vie privée',
      href: '/vie-privee',
    },
    partenaires: {
      title: 'Partenaires',
      href: '/partenaires',
    },
    faq: {
      title: 'FAQ',
      href: '/faq',
    },
    stats: {
      title: 'Statistiques',
      href: '/stats',
    },
    Blog: {
      title: 'Blog',
      href: '/blog',
    },
  },
  Documentations: {
    guide: {
      title: 'Nos guides thématiques',
      href: '/documentation/guide',
    },
    modele: {
      title: 'Le modèle Nos Gestes Climat',
      href: '/documentation/modele',
    },
    documentation: {
      title: 'Documentation',
      href: '/documentation',
    },
  },
}

export default function PlanDuSitePage() {
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
