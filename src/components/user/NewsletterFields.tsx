'use client'

import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import { useLocale } from '@/hooks/useLocale'
import i18nConfig from '@/i18nConfig'
import type { UseFormRegister } from 'react-hook-form'
import Trans from '../translation/trans/TransClient'

type Inputs = {
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
  name: string
}

export default function NewsletterFields({
  register,
}: {
  register: UseFormRegister<Inputs>
}) {
  const locale = useLocale()

  // Display newsletter fields only in fr version
  if (locale !== i18nConfig.defaultLocale) return null

  return (
    <>
      <CheckboxInputGroup
        label={
          <p className="mb-0 text-sm">
            <span>
              <Trans>Je m'inscris à l'infolettre</Trans>
            </span>{' '}
            -{' '}
            <span className="text-gray-700">
              <Trans>1 par mois max</Trans>
            </span>
          </p>
        }
        {...register('newsletter-saisonniere')}
      />

      <CheckboxInputGroup
        label={
          <p className="mb-0 text-sm">
            <span>Nos Gestes Transports</span> -{' '}
            <span className="text-gray-700">
              <Trans>4 infolettres l’impact des transports</Trans>
            </span>
          </p>
        }
        {...register('newsletter-transports')}
      />

      <CheckboxInputGroup
        label={
          <p className="mb-0 text-sm">
            <span>Nos Gestes Logement</span> -{' '}
            <span className="text-gray-700">
              <Trans>5 infolettres sur l’impact du logement</Trans>
            </span>
          </p>
        }
        {...register('newsletter-logement')}
      />
    </>
  )
}
