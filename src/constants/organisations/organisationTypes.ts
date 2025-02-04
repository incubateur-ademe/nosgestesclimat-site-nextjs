import { t } from 'i18next'

export enum OrganisationTypeEnum {
  company = 'company',
  association = 'association',
  publicOrRegionalAuthority = 'publicOrRegionalAuthority',
  universityOrSchool = 'universityOrSchool',
  other = 'other',
}

export const ORGANISATION_TYPES = {
  [OrganisationTypeEnum.company]: t('Entreprise'),
  [OrganisationTypeEnum.association]: t('Association'),
  [OrganisationTypeEnum.publicOrRegionalAuthority]: t('Service public'),
  [OrganisationTypeEnum.universityOrSchool]: t('Université ou école'),
  [OrganisationTypeEnum.other]: t('Autre'),
}
