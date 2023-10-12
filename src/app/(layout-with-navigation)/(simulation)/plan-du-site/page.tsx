import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { APP_URL } from '@/constants/urls'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Plan du site - Nos Gestes Climat',
    description:
      'Retrouvez toutes les pages du site nosgestesclimat.fr pour calculer votre empreinte carbone.',
  })
}

const links = {
  'Nos outils': {
    'publicodes.planDuSite.bilan': `${APP_URL}/simulateur/bilan`,
    'publicodes.planDuSite.profil': `${APP_URL}/profil`,
    'publicodes.planDuSite.personas': `${APP_URL}/personas`,
    'publicodes.planDuSite.actions': `${APP_URL}/actions`,
    'publicodes.planDuSite.actionsPlus': `${APP_URL}/actions/plus`,
  },
  Informations: {
    'publicodes.planDuSite.nouveautes': `${APP_URL}/nouveautes`,
    'publicodes.planDuSite.aPropos': `${APP_URL}/a-propos`,
    'publicodes.planDuSite.contact': `${APP_URL}/contact`,
    'publicodes.planDuSite.viePrivee': `${APP_URL}/vie-privee`,
    'publicodes.planDuSite.partenaires': `${APP_URL}/partenaires`,
    'publicodes.planDuSite.faq': `${APP_URL}/questions-frequentes`,
    'publicodes.planDuSite.stats': `${APP_URL}/stats`,
    Blog: `${APP_URL}/blog`,
  },
  Documentations: {
    'publicodes.planDuSite.guide': `${APP_URL}/guide`,
    'publicodes.planDuSite.modele': `${APP_URL}/modele`,
    'publicodes.planDuSite.documentation': `${APP_URL}/documentation`,
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

      {Object.entries(links).map(([categoryTitle, categoryLinks]) => (
        <section key={categoryTitle} className="mb-2">
          <h2>
            <Trans i18nKey={`${categoryTitle}`}>{categoryTitle}</Trans>
          </h2>
          <ul className="m-0 list-none p-0">
            {Object.entries(categoryLinks).map(([linkKey, linkUrl]) => (
              <li key={linkKey}>
                <Link href={linkUrl}>
                  <Trans i18nKey={`${linkKey}`}>{linkKey}</Trans>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section>
        <h2>
          <Trans i18nKey="publicodes.planDuSite.actionsPlus">Les actions</Trans>
        </h2>

        <Actions />
      </section>
    </div>
  )
}
