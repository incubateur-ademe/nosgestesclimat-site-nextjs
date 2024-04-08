'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
}

export default function MesInformations() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useClientTranslation()

  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    setIsSubmitted(true)
  }

  return (
    <div>
      <h2>
        <Trans>Mes informations</Trans>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextInputGroup
          value={user?.name}
          label={t('Votre nom')}
          {...register('name', { required: t('Ce champ est requis.') })}
          error={errors.name?.message}
        />

        <TextInputGroup
          label={t('Votre adresse email')}
          value={user?.email}
          disabled
          {...register('email')}
          error={errors.name?.message}
        />

        <h3 className="mb-0 mt-6">
          <Trans>Inscription à nos e-mails</Trans>
        </h3>
        <p className="text-gray-600">
          <Trans>Vous pouvez vous désincrire à tout moment</Trans>
        </p>

        <CheckboxInputGroup
          label={t(
            'Infolettre saisonnière de Nos Gestes Climat : actualités climat, initiatives positives et nouveautés'
          )}
          {...register('newsletter-saisonniere')}
        />

        <CheckboxInputGroup
          label={t(
            "Nos Gestes Transports : tout savoir ou presque sur l'impact carbone des transports, en 4 newsletters"
          )}
          {...register('newsletter-transports')}
        />

        <div className="flex flex-wrap gap-4">
          <Button
            type="submit"
            className="mt-6 self-start"
            disabled={isSubmitted}>
            <Trans>Mettre à jour mes informations</Trans>
          </Button>
          {isSubmitted && (
            <p className="text-green-700">
              <Trans>Modifications sauvegardées.</Trans>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
