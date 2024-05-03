import { CUSTOM_NGC_ACTIONS } from '@/constants/actions'
import { LIST_NOS_GESTES_TRANSPORT_NEWSLETTER } from '@/constants/brevo'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRef } from 'react'
import { useGetNewsletterSubscriptions } from '../settings/useGetNewsletterSubscriptions'

export function useCustomActions() {
  const customActions = []
  const { user } = useUser()

  const { actionChoices } = useCurrentSimulation()
  // Avoid refetching useGetNewsletterSubscriptions when defining an email for the first time
  const emailRef = useRef<string>(user?.email ?? '')

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    emailRef?.current ?? ''
  )
  // Nos Gestes Transport
  if (
    !newsletterSubscriptions?.includes(LIST_NOS_GESTES_TRANSPORT_NEWSLETTER) ||
    Object.keys(actionChoices || {}).includes(
      CUSTOM_NGC_ACTIONS.nosGestesTransports.dottedName
    )
  ) {
    customActions.push(CUSTOM_NGC_ACTIONS.nosGestesTransports)
  }

  return customActions
}
