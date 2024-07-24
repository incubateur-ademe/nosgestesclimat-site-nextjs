'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { classementClickOrganisation } from '@/constants/tracking/pages/classements'
import ChevronRight from '@/design-system/icons/ChevronRight'
import Badge from '@/design-system/layout/Badge'
import { Organisation } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function OrganisationItem({
  organisation,
}: {
  organisation: Organisation
}) {
  return (
    <Link
      href={`/organisations/${organisation?.slug}`}
      className="mb-6 rounded-xl bg-gray-100 px-5 py-2 no-underline decoration-auto transition-colors hover:bg-primary-100"
      onClick={() => trackEvent(classementClickOrganisation)}>
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center gap-4">
          <div>
            <div className="text-md font-bold text-gray-900">
              {organisation?.name}
            </div>
          </div>

          <div className="flex gap-1 text-sm text-violet-900">
            <Badge className="ml-2 inline border-secondary-300  text-xs font-bold text-secondary-700">
              <Trans>Administrateur·ice</Trans>
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
