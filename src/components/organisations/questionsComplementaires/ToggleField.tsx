import PencilIcon from '@/components/icons/PencilIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ConfirmationModal from '@/design-system/modals/ConfirmationModal'
import { KeyboardEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  name: string
  className?: string
  isCustomQuestion?: boolean
  onEdit?: () => void
  onDelete?: (question: string) => Promise<void>
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
          'relative flex w-full flex-col items-center overflow-hidden rounded-xl border-2 border-gray-200 p-4 transition-colors',
          `${isEnabled ? 'border-primary-300 bg-primary-100' : ''} ${className}`
        )}>
        <div className="flex w-full items-center justify-between">
          <p className="mb-0 cursor-default">{label}</p>

          <div className="relative inline-flex cursor-pointer items-center justify-between">
            <input
              id={name}
              type="checkbox"
              className="peer sr-only"
              checked={isEnabled}
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
                  onKeyDown={handleKeyboardEvent}
                  onClick={handleMouseEvent}
                  className={twMerge(
                    "peer h-6 w-11 rounded-full bg-primary-200  after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-focus:ring-primary-300",
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
