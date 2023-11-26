import LocalisationBanner from '@/components/translation/LocalisationBanner'
import Trans from '@/components/translation/Trans'
import { NGC_MODEL_API_URL } from '@/constants/urls'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Markdown from '@/design-system/utils/Markdown'
import { fetchModel } from '@/helpers/data/fetchModel'
import { Rules } from '@/publicodes-state/types'
import { SuppportedRegions } from '@/types/international'
import { capitalizeString } from '@/utils/capitalizeString'
import { decodeRuleNameFromPath } from '@/utils/decodeRuleNameFromPath'
import { currentLocale } from 'next-i18n-router'
import { redirect } from 'next/navigation'
import { JSX } from 'react'
import CalculDetail from './documentationServer/CalculDetail'
import PagesProches from './documentationServer/PagesProches'
import QuestionSection from './documentationServer/QuestionSection'

type Props = {
  supportedRegions: SuppportedRegions
  slugs: string[]
  ctaButtonElement: JSX.Element
}
export default async function DocumentationServer({
  supportedRegions,
  slugs,
  ctaButtonElement,
}: Props) {
  const ruleName = decodeRuleNameFromPath(slugs.join('/'))

  const locale = currentLocale()

  if (!ruleName) {
    redirect('/404')
    return null
  }

  // We load the default rules to render the server side documentation
  const rules: Rules = await fetchModel({
    dataServer: NGC_MODEL_API_URL,
    regionCode: 'FR',
    locale: locale ?? 'fr',
    isOptim: false,
  })

  const rule = rules[ruleName]

  if (!rule) {
    redirect('/404')
  }

  return (
    <div className="mt-4">
      <LocalisationBanner supportedRegions={supportedRegions} />

      <Title
        title={`${rule.icônes ?? ''} ${capitalizeString(
          rule?.titre ??
            ruleName?.split(' . ')[ruleName?.split(' . ').length - 1]
        )}`}
      />

      {rule.question && <QuestionSection rule={rule} />}

      {!rule.question && rule.description && (
        <section className="mt-4">
          <Markdown>{rule.description}</Markdown>
        </section>
      )}

      {rule.note && (
        <section className="mt-4">
          <h2>Notes</h2>
          <Markdown>{rule.note}</Markdown>
        </section>
      )}

      <CalculDetail rule={rule} ruleName={ruleName} rules={rules} />

      <Card className="mb-4 mt-4 bg-primary-200">
        <p className="mb-0">
          <Trans>
            Pour en savoir plus sur cette règle de notre modèle, lancer le
            calcul en cliquant sur le bouton ci-dessous.
          </Trans>
        </p>
      </Card>
      {ctaButtonElement}

      <PagesProches rules={rules} ruleName={ruleName} />
    </div>
  )
}
