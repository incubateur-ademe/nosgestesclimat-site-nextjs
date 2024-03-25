import { Organisation } from '@/types/organisations'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { usePreventNavigation } from './usePreventNavigation'

type Props = {
  isError: boolean
  organisation: Organisation | undefined
}

export function useOrgaCreationGuard({ isError, organisation }: Props) {
  const router = useRouter()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)

  const { handleUpdateShouldPreventNavigation } = usePreventNavigation()

  useEffect(() => {
    handleUpdateShouldPreventNavigation(true)
  }, [handleUpdateShouldPreventNavigation])

  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return

    setIsGuardInit(true)

    if (isError) {
      handleUpdateShouldPreventNavigation(false)
      setIsGuardRedirecting(true)
      router.push('/organisations/connexion')
      return
    }

    if (organisation?.slug) {
      handleUpdateShouldPreventNavigation(false)
      setIsGuardRedirecting(true)
      router.push(`/organisations/${organisation.slug}`)
      return
    }
  }, [
    handleUpdateShouldPreventNavigation,
    isError,
    isGuardInit,
    organisation?.slug,
    router,
  ])

  return { isGuardInit, isGuardRedirecting }
}
