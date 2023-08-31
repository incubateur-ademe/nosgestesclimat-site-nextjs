'use client'

import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'

export default function GithubContributionCard() {
  return (
    <Card className="flex flex-col">
      <p className="mt-0">
        <TransClient i18nKey={'publicodes.Contribution.liensVersGithub'}>
          Pour toute remarque ou question, nous vous invitons à{' '}
          <a href="https://github.com/datagir/nosgestesclimat/issues/new?assignees=&labels=contribution&template=retour-utilisateur.md&title=">
            ouvrir un ticket directement sur GitHub
          </a>
          .
        </TransClient>
      </p>
      <details>
        <summary>
          <TransClient i18nKey={'publicodes.Contribution.bugQuestion'}>
            🐛 Vous avez un bug qui vous empêche d'utiliser Nos Gestes Climat ?
          </TransClient>
        </summary>
      </details>
    </Card>
  )
}
