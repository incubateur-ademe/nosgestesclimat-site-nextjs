'use client'

import Button from '@/design-system/buttons/Button'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'

interface Props {
  linkToPrev: string
  handleSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
  submitDisabled?: boolean
}

export default function Navigation({
  linkToPrev,
  handleSubmit,
  submitDisabled,
}: Props) {
  const { t } = useClientTranslation()
  return (
    <div className="my-8 flex justify-between border-b border-gray-200 pb-8">
      <ButtonLink href={linkToPrev} color="secondary" title={t('précédent')}>
        ←
      </ButtonLink>

      <Button
        data-testid="next-button"
        onClick={(event) => {
          if (handleSubmit) handleSubmit(event)
        }}
        disabled={submitDisabled}>
        {t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
