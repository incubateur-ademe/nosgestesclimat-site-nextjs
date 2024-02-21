'use client'

import useFetchOrganisation from '@/app/(layout-with-navigation)/(simulation)/organisations/_hooks/useFetchOrganisation'
import OrganisationIcon from '@/components/icons/OrganisationIcon'
import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import NavLink from '../NavLink'

export default function OrganisationLink() {
  const { t } = useClientTranslation()

  const { user } = useUser()

  const { data: organisation } = useFetchOrganisation({
    email: user?.administratorEmail ?? '',
  })

  return (
    <NavLink
      href={
        organisation
          ? `organisations/${organisation?.slug}`
          : '/organisations/connexion'
      }
      icon={OrganisationIcon}
      title={t('Organisation')}>
      {organisation?.name ? (
        <span className="whitespace-nowrap">
          {organisation?.name?.length > 10
            ? `${organisation?.name.substring(0, 14).trim()}…`
            : organisation?.name}
        </span>
      ) : (
        <Trans>Organisation</Trans>
      )}
    </NavLink>
  )
}
