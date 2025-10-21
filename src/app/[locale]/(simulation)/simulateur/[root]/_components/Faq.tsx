'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { simulateurClickFaq } from '@/constants/tracking/pages/simulateur'

import { useIframeStatic } from '@/hooks/useIframeStatic'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function Faq() {
  const { isIframeOnlySimulation } = useIframeStatic()

  if (isIframeOnlySimulation) return null

  return (
    <div className="mx-auto mb-4 rounded-xl bg-gray-100 p-4 text-center">
      <p>
        <Trans>Une question, un problème ?</Trans>
      </p>
      <Link
        href="/questions-frequentes"
        onClick={() => trackEvent(simulateurClickFaq)}>
        <Trans>Découvrez la FAQ !</Trans>
      </Link>
    </div>
  )
}
