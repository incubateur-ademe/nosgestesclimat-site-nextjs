import { FocusEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './Button'

type Props = {
  name: string
  type?: string
  placeholder?: string
  defaultValue?: string
  label: string
  onClose: () => void
  onSubmit: (value: string) => Promise<any>
  isLoading?: boolean
}

export default function InlineTextInput({
  name,
  type = 'text',
  placeholder,
  defaultValue,
  label,
  onClose = () => {},
  onSubmit,
  isLoading,
  ...props
}: Props) {
  const [error, setError] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  const handleSubmit = async () => {
    const inputValue = inputRef.current?.value

    if (!inputValue) {
      setError(t('Veuillez renseigner un nom.'))
      return
    }

    await onSubmit(inputValue)

    onClose()
  }

  return (
    <div
      className="flex flex-col"
      aria-live="polite"
      onBlurCapture={(event: FocusEvent) => {
        if (event?.relatedTarget?.id === 'inline-input-button') {
          return
        }
        // onClose()
      }}>
      <label htmlFor={name} className="mb-2">
        <span
          className={`text-sm font-bold text-slate-900 ${
            error ? '!text-red-700' : ''
          }`}>
          {label}
        </span>
      </label>
      <div className="flex items-stretch">
        <input
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`focus:border-primary-500 focus:ring-primary-500 max-w-[30rem] flex-1 rounded-s-md border border-solid border-grey-200 bg-grey-100 !p-4 text-sm transition-colors focus:ring-2 ${
            error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : ''
          }`}
          aria-describedby={`error-${name}`}
          defaultValue={defaultValue}
          // We alert the user when focusing the button that
          // display the input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          disabled={isLoading}
          {...props}
        />
        <Button
          className="!border-primary-500 rounded-s-none !border-2"
          id="inline-input-button"
          onClick={handleSubmit}
          aria-label={t('Ok, sauvegarder la modification')}
          disabled={isLoading}
          data-cypress-id="button-inline-input">
          Ok
        </Button>
      </div>
    </div>
  )
}
