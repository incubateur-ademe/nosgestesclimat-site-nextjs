'use client'

import GithubContributionForm from '@/components/misc/GithubContributionForm'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'

export default function GithubContributionCard() {
  return (
    <Card>
      <p className="mt-0">
        <Trans i18nKey={'publicodes.Contribution.liensVersGithub'}>
          Pour toute remarque ou question, nous vous invitons à{' '}
          <a href="https://github.com/incubateur-ademe/nosgestesclimat/issues/new?assignees=&labels=contribution&template=retour-utilisateur.md&title=">
            ouvrir un ticket directement sur GitHub
          </a>
          .
        </Trans>
      </p>
      <details>
        <summary>
          <Trans i18nKey={'publicodes.Contribution.bugQuestion'}>
            🐛 Vous avez un bug qui vous empêche d'utiliser Nos Gestes Climat ?
          </Trans>
        </summary>

        <GithubContributionForm />
      </details>
    </Card>
  )
}
