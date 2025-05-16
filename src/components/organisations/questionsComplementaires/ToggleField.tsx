'use client'

import PencilIcon from '@/components/icons/PencilIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { onKeyDownHelper } from '@/helpers/accessibility/onKeyDownHelper'
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
  helperText?: string
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
  helperText,
}: Props) {
  const [isEnabled, setIsEnabled] = useState<boolean>(value)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const handleMouseEvent = () => {
    setIsEnabled((prev) => !prev)
    onChange(!isEnabled)
  }

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleMouseEvent()
    }
  }

  function handleDelete() {
    if (onDelete) {
      onDelete(label)
    }
  }

  return (
    <>
      <div
        className={twMerge(
          'relative flex w-full flex-col items-center overflow-hidden rounded-xl border-2 border-gray-200 p-4 transition-colors',
          `${isEnabled ? 'border-primary-300 bg-primary-100' : ''} ${className}`
        )}>
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="mb-0 cursor-default">{label}</p>
            {helperText && (
              <p className="mt-1 mb-0 cursor-default text-sm text-gray-700">
                {helperText}
              </p>
            )}
          </div>

          <div className="relative inline-flex cursor-pointer items-center justify-between">
            <input
              id={name}
              type="checkbox"
              className="peer sr-only"
              checked={isEnabled}
              tabIndex={-1}
              readOnly
            />

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
              <div className="relative">
                <div
                  tabIndex={0}
                  role="checkbox"
                  aria-checked="false"
                  aria-labelledby="toggleLabel"
                  aria-describedby="toggleDescription"
                  onKeyDown={onKeyDownHelper(handleKeyboardEvent)}
                  onClick={handleMouseEvent}
                  className={twMerge(
                    "peer bg-primary-200 peer-focus:ring-primary-300 h-6 w-11 rounded-full after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']",
                    `${isEnabled ? 'bg-primary-700 after:translate-x-full after:border-white' : ''}`
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isConfirmingDelete && (
        <ConfirmationModal
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
