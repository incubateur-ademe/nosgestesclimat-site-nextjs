import Trans from '@/components/translation/trans/TransClient'
import Link from 'next/link'
import { UseFormRegisterReturn } from 'react-hook-form'

interface RadioProps {
  id: string
  name: string
  checked: boolean
  disabled?: boolean
  label: string | React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CookieRadio = ({
  id,
  name,
  checked,
  disabled,
  label,
  ...props
}: RadioProps) => (
  <label
    className={`inline-flex cursor-pointer items-center gap-2 select-none ${disabled ? 'opacity-50' : ''}`}
    htmlFor={id}>
    <input
      type="radio"
      id={id}
      name={name}
      checked={checked}
      disabled={disabled}
      className="peer sr-only"
      {...props}
    />
    <span
      className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 ${checked ? 'border-blue-800' : 'border-gray-300'} bg-white transition-colors duration-150`}>
      <span
        className={`absolute top-1/2 left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${checked ? 'bg-blue-800' : ''}`}></span>
    </span>
    <span className="text-sm font-medium text-gray-900 md:text-base">
      {label}
    </span>
  </label>
)

interface CookieFieldsetProps {
  id: string
  titleI18nKey: string
  titleDefault: string
  descriptionI18nKey: string
  descriptionDefault: string
  linkHref: string
  linkI18nKey: string
  linkDefault: string
  currentValue: 'accept' | 'refuse'
  register: UseFormRegisterReturn
  className?: string
}

export const CookieFieldset = ({
  id,
  titleI18nKey,
  titleDefault,
  descriptionI18nKey,
  descriptionDefault,
  linkHref,
  linkI18nKey,
  linkDefault,
  currentValue,
  register,
  className = '',
}: CookieFieldsetProps) => (
  <fieldset className={`border-t border-gray-200 ${className}`}>
    <legend className="mb-2 flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <span
        className="text-base font-bold whitespace-nowrap text-gray-900 md:text-lg"
        data-testid={`${id}-title`}>
        <Trans i18nKey={titleI18nKey}>{titleDefault}</Trans>
      </span>
      <div className="flex gap-6">
        <CookieRadio
          id={`${id}-accept`}
          value="accept"
          checked={currentValue === 'accept'}
          data-testid={`${id}-accept-radio`}
          label={<Trans i18nKey="cookies.management.accept">Accepter</Trans>}
          {...register}
        />
        <CookieRadio
          id={`${id}-refuse`}
          value="refuse"
          checked={currentValue === 'refuse'}
          data-testid={`${id}-refuse-radio`}
          label={<Trans i18nKey="cookies.management.refuse">Refuser</Trans>}
          {...register}
        />
      </div>
    </legend>
    <p
      className="mt-2 text-base text-gray-700"
      data-testid={`${id}-description`}>
      <Trans i18nKey={descriptionI18nKey}>{descriptionDefault}</Trans>
    </p>
    <Link className="text-primary-700 underline" href={linkHref}>
      <Trans i18nKey={linkI18nKey}>{linkDefault}</Trans>
    </Link>
  </fieldset>
)
