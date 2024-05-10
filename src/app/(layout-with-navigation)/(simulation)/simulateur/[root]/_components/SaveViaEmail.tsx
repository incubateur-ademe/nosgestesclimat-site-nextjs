'use client'

import UserInformationForm from '@/components/user/UserInformationForm'

import { useIframe } from '@/hooks/useIframe'

export default function SaveViaEmail() {
  // We do not display the component if we are in an iframeSimulation context
  const { isIframeOnlySimulation } = useIframe()
  if (isIframeOnlySimulation) return null

  return (
    <div className="short:py-2 relative rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-6">
      <UserInformationForm
        title="Sauvegardez votre progression"
        inputsDisplayed={['email']}
        submitLabel="Sauvegarder"
      />
    </div>
  )
}
