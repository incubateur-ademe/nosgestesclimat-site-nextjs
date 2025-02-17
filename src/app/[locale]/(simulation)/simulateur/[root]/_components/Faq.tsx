'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import { simulateurClickFaq } from '@/constants/tracking/pages/simulateur'

import { useIframe } from '@/hooks/useIframe'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function Faq() {
  const { isIframeOnlySimulation } = useIframe()

  if (isIframeOnlySimulation) return null

  return (
    <div className="mx-auto mb-4 rounded-xl bg-gray-100 p-4 text-center">
      <p>
        <TransClient>Une question, un problème ?</TransClient>
      </p>
      <Link
        href="/questions-frequentes"
        onClick={() => trackEvent(simulateurClickFaq)}>
        <TransClient>Découvrez la FAQ !</TransClient>
      </Link>
    </div>
  )
}
