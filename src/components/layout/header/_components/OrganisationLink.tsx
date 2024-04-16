'use client'

import useFetchOrganisation from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useFetchOrganisation'
import OrganisationIcon from '@/components/icons/OrganisationIcon'
import Trans from '@/components/translation/Trans'
import { headerClickOrganisation } from '@/constants/tracking/layout'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import NavLink from '../NavLink'

export default function OrganisationLink() {
  const { t } = useClientTranslation()

  const { user } = useUser()

  const { data: organisation } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const organisationName = organisation?.name ?? user?.organisation?.name

  const formattedOrganisationName =
    organisationName && organisationName?.length > 14
      ? `${organisationName?.substring(0, 14).trim()}…`
      : organisationName

  const isOrganisationFullyCreated = !!organisation?.slug

  return (
    <NavLink
      href={
        isOrganisationFullyCreated
          ? `/organisations/${organisation?.slug}`
          : '/organisations/connexion'
      }
      onClick={() => trackEvent(headerClickOrganisation)}
      icon={OrganisationIcon}
      title={t('Organisation')}>
      {isOrganisationFullyCreated ? (
        <span className="whitespace-nowrap">{formattedOrganisationName}</span>
      ) : (
        <Trans>Organisation</Trans>
      )}
    </NavLink>
  )
}
