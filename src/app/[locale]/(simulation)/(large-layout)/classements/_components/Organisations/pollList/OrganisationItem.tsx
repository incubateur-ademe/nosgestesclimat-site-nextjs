'use client'

import Link from '@/components/Link'
import ChevronRight from '@/components/icons/ChevronRight'
import TransClient from '@/components/translation/trans/TransClient'
import { classementClickOrganisation } from '@/constants/tracking/pages/classements'
import Badge from '@/design-system/layout/Badge'
import type { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function OrganisationItem({
  organisation,
}: {
  organisation: Organisation
}) {
  return (
    <Link
      href={`/organisations/${organisation?.slug}`}
      className="hover:bg-primary-100 mb-6 rounded-xl bg-gray-100 px-5 py-2 no-underline decoration-auto transition-colors"
      onClick={() => trackEvent(classementClickOrganisation)}>
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center gap-4">
          <div>
            <div className="text-md font-bold text-gray-900">
              {organisation?.name}
            </div>
          </div>

          <div className="flex gap-1 text-sm text-violet-900">
            <Badge className="border-secondary-300 text-secondary-700 ml-2 inline text-xs font-bold">
              <TransClient>Administrateur·ice</TransClient>
            </Badge>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex-shrink-0">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  )
}
