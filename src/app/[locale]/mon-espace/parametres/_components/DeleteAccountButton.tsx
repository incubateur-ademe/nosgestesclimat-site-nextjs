'use client'

import TrashIcon from '@/components/icons/TrashIcon'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'

export default function DeleteAccountButton({
  className,
}: {
  className?: string
}) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Voulez-vous vraiment supprimer votre espace ? Cette action est irréversible.'
    )
    if (!confirmed) return

    // Best-effort client-side cleanup; server-side deletion handled elsewhere
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem('ngc')
      } catch (e) {
        console.warn('Local cleanup failed', e)
      }
    }

    window.location.assign('/')
  }

  return (
    <Button
      color="secondary"
      onClick={handleDelete}
      className={
        (className ? className + ' ' : '') +
        'border-red-600 text-red-700 hover:bg-red-100 hover:text-red-800'
      }>
      <TrashIcon className="mr-2 fill-red-700" />
      <Trans>Supprimer mon espace</Trans>
    </Button>
  )
}
