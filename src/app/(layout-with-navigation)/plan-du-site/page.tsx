'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/TransClient'
import Title from '@/design-system/layout/Title'

const appURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://nosgestesclimat.fr'

const links = {
  'Nos outils': {
    'publicodes.planDuSite.bilan': `${appURL}/simulateur/bilan`,
    'publicodes.planDuSite.groupe': `${appURL}/groupe`,
    'publicodes.planDuSite.profil': `${appURL}/profil`,
    'publicodes.planDuSite.personas': `${appURL}/personas`,
    'publicodes.planDuSite.actions': `${appURL}/actions`,
    'publicodes.planDuSite.actionsPlus': `${appURL}/actions/plus`,
  },
  Informations: {
    'publicodes.planDuSite.nouveautes': `${appURL}/nouveautés`,
    'publicodes.planDuSite.aPropos': `${appURL}/à-propos`,
    'publicodes.planDuSite.contact': `${appURL}/contact`,
    'publicodes.planDuSite.viePrivee': `${appURL}/vie-privée`,
    'publicodes.planDuSite.partenaires': `${appURL}/partenaires`,
    'publicodes.planDuSite.faq': `${appURL}/questions-frequentes`,
    'publicodes.planDuSite.stats': `${appURL}/stats`,
    Blog: `${appURL}/blog`,
  },
  Documentations: {
    'publicodes.planDuSite.guide': `${appURL}/guide`,
    'publicodes.planDuSite.sondageDoc': `${appURL}/groupe/documentation-contexte`,
    'publicodes.planDuSite.modele': `${appURL}/modèle`,
    'publicodes.planDuSite.petroleEtGaz': `${appURL}/pétrole-et-gaz`,
    'publicodes.planDuSite.documentation': `${appURL}/documentation`,
  },
}

export default function PlanDuSite() {
  // const rules = useSelector((state: AppState) => state.rules)
  /*
  const engine = new Engine(rules)

	const { rawActionsList } = useActions({
		focusedAction: null,
		rules,
		radical: true,
		engine,
		metric: null,
	})
  */

  return (
    <>
      <Title
        title={
          <TransClient i18nKey="publicodes.planDuSite.title">
            Plan du site
          </TransClient>
        }
      />

      {Object.entries(links).map(([categoryTitle, categoryLinks]) => (
        <section key={categoryTitle} className="mb-2">
          <h2>
            <TransClient i18nKey={`${categoryTitle}`}>
              {categoryTitle}
            </TransClient>
          </h2>
          <ul className="m-0 list-none p-0">
            {Object.entries(categoryLinks).map(([linkKey, linkUrl]) => (
              <li key={linkKey}>
                <Link href={linkUrl}>
                  <TransClient i18nKey={`${linkKey}`}>{linkKey}</TransClient>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section>
        <h2>
          <TransClient i18nKey="publicodes.planDuSite.actionsPlus">
            Les actions
          </TransClient>
        </h2>
        <ul className="m-0 list-none p-0">
          {/*
          rawActionsList.map((action) => {
						return (
							<li key={action.dottedName}>
								<Link
									href={`${appURL}/actions/${utils.encodeRuleName(
										action.dottedName,
									)}`}
								>
									{getTitle(action)}
								</Link>
							</li>
						)
					})
        */}
        </ul>
      </section>
    </>
  )
}
