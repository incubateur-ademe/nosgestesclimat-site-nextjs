'use client'

import PencilIcon from '@/components/icons/PencilIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { KeyboardEvent } from 'react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  name: string
  className?: string
  isCustomQuestion?: boolean
  onEdit?: () => void
  onDelete?: (question: string) => void
  isLoadingUpdate?: boolean
}

export default function ToggleField({
  label,
  value,
  onChange,
  onEdit,
  onDelete,
  name,
  className,
  isCustomQuestion = false,
  isLoadingUpdate,
}: Props) {
  const [isEnabled, setIsEnabled] = useState<boolean>(value)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const { t } = useClientTranslation()

  const handleMouseEvent = () => {
    setIsEnabled((prev) => !prev)
    onChange(!isEnabled)
  }

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleMouseEvent()
    }
  }

  async function handleDelete() {
    if (onDelete) {
      await onDelete(label)
    }
  }

  return (
    <>
      <div
        className={twMerge(
          'focus-within:ring-primary-700 relative flex w-full flex-col items-center overflow-hidden rounded-xl border border-slate-500 p-4 transition-colors focus-within:ring-2 focus-within:ring-offset-2',
          isEnabled && 'border-primary-700 bg-primary-100',
          className
        )}>
        <div className="flex w-full items-center justify-between">
          <div className="relative inline-flex cursor-pointer items-center justify-between gap-4">
            <div className="relative">
              <input
                id={`toggle-${name}`}
                type="checkbox"
                className="sr-only"
                checked={isEnabled}
                onChange={handleMouseEvent}
                tabIndex={-1}
              />
              <div
                className={twMerge(
                  "peer bg-primary-100 focus-within:ring-primary-700 h-6 w-11 cursor-pointer rounded-full border border-slate-900 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-900 after:bg-white after:transition-all after:content-[''] focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none",
                  isEnabled &&
                    'bg-primary-700 after:translate-x-full after:border-white'
                )}
                onKeyDown={onKeyDownHelper(handleKeyboardEvent)}
                onClick={handleMouseEvent}
                tabIndex={0}
                role="switch"
                aria-checked={isEnabled}
                aria-labelledby={`toggle-label-${name}`}
                title={`${label} - ${isEnabled ? t('Activé') : t('Désactivé')}`}
              />
            </div>
            <label
              id={`toggle-label-${name}`}
              htmlFor={`toggle-${name}`}
              className="mb-0 cursor-pointer">
              {label}
            </label>
          </div>

          <div className="relative inline-flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              {isCustomQuestion && (
                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    color="text"
                    className="h-7 w-7 p-0"
                    onClick={onEdit}>
                    <PencilIcon width="16" />
                  </Button>

                  <Button
                    size="xs"
                    color="text"
                    className="h-7 w-7 p-0"
                    onClick={() => setIsConfirmingDelete(true)}>
                    <TrashIcon width="16" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isConfirmingDelete && (
        <ConfirmationModal
          ariaLabel={t(
            'organisations.additionalQuestions.deletion.modal.ariaLabel',
            'Fenêtre de confirmation de suppression de la question personnalisée'
          )}
          onConfirm={handleDelete}
          closeModal={() => setIsConfirmingDelete(false)}
          isLoading={isLoadingUpdate}>
          <h2>
            <Trans>Supprimer cette question personnalisée ?</Trans>
          </h2>
          <p>
            <Trans>Cette action est définitive.</Trans>
          </p>
        </ConfirmationModal>
      )}
    </>
  )
}
