import { t } from '@/helpers/metadata/fakeMetadataT'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import TextInput from './TextInput'

type Props = Omit<
  ComponentProps<typeof TextInput>,
  'type' | 'autoComplete' | 'placeholder' | 'name'
>

export default forwardRef(function EmailInput(
  {
    label = t('ui.emailInput.label', 'Votre adresse e-mail'),
    helperText = t(
      'ui.emailInput.helperText',
      'Format attendu : nom.prenom@domaine.fr'
    ),
    ...props
  }: Props,
  ref
) {
  return (
    <TextInput
      label={label}
      helperText={helperText}
      name="email"
      type="email"
      autoComplete="email"
      placeholder="nom@exemple.fr"
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      {...props}
    />
  )
})
