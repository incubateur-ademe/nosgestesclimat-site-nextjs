import { t } from 'i18next'

export enum OrganisationTypeEnum {
  association = 'association',
  company = 'company',
  cooperative = 'cooperative',
  groupOfFriends = 'groupOfFriends',
  other = 'other',
  publicOrRegionalAuthority = 'publicOrRegionalAuthority',
  universityOrSchool = 'universityOrSchool',
}

export const ORGANISATION_TYPES = {
  [OrganisationTypeEnum.company]: t('Entreprise'),
  [OrganisationTypeEnum.publicOrRegionalAuthority]: t(
    'Public ou collectivité territoriale'
  ),
  [OrganisationTypeEnum.cooperative]: t('Coopérative'),
  [OrganisationTypeEnum.association]: t('Association'),
  [OrganisationTypeEnum.universityOrSchool]: t('Université ou école'),
  [OrganisationTypeEnum.groupOfFriends]: t("Groupe d'amis"),
  [OrganisationTypeEnum.other]: t('Autre'),
}
