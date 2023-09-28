'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import Image from 'next/image'
import { utils } from 'publicodes'

import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getRuleTitle } from '@/helpers/publicodes/getRuleTitle'
import { useGetPRNumber } from '@/hooks/useGetPRNumber'
import { NGCRule, NGCRules } from '@/publicodes-state/types'
import { useFetchDocumentation } from '../_hooks/useFetchDocumentation'

export function generateMetadata() {
  return getMetadataObject({
    title: 'Actions, la liste - Nos Gestes Climat',
    description:
      'Découvrez les actions que vous pouvez mettre en place pour réduire votre empreinte carbone.',
  })
}

export default function ActionList() {
  const locale = useLocale()
  const { user } = useUser()
  const { data: rules } = useRules({
    region: user.region.code,
    lang: locale || 'fr',
  })

  const { PRNumber } = useGetPRNumber()

  const { data: documentation } = useFetchDocumentation(PRNumber)

  if (!documentation) {
    return null
  }

  const plusListe = Object.entries(rules as NGCRules)
    .map(([dottedName, rule]) => ({ ...rule, dottedName }))
    .map((rule) => {
      const plus = documentation?.['actions-plus/' + rule.dottedName]
      return { ...rule, plus }
    })
    .filter((r) => r.plus)

  return (
    <div className="mt-8">
      <h2>
        <Trans>Nos explications complètes</Trans>{' '}
        <Image
          src="/images/misc/beta.svg"
          width={36}
          height={10}
          alt="beta"
          className="inline align-top"
        />
      </h2>

      <p>
        <em>
          <Trans>
            Découvrez les enjeux qui se cachent derrière chaque action.
          </Trans>
        </em>
      </p>

      <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-3">
        {plusListe.map((rule) => (
          <li key={rule.dottedName}>
            <Card
              className="h-[12rem] flex-col items-center justify-center no-underline"
              tag={Link}
              href={'/actions/plus/' + utils.encodeRuleName(rule.dottedName)}>
              <div className="mb-8 text-2xl">{rule.icônes || '🎯'}</div>
              <div className="text-center">
                {getRuleTitle(
                  rule as NGCRule & { dottedName: string; titre: string }
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
