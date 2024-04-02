// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #83
export const classementCreateGroup = [
  'trackEvent',
  'Classement',
  'Create Group',
]

// Figma comment #84
export const classementCreateOrganisation = [
  'trackEvent',
  'Classement',
  'Create Organisation',
]

type ClassementClickItem = {
  isAdministator: boolean
  numParticipants?: number
}

// Figma comment #85
export const classementClickGroup = ({
  isAdministator,
  numParticipants,
}: ClassementClickItem) => [
  'trackEvent',
  'Classement',
  'Click Group',
  isAdministator ? 'Administrator' : 'Participant',
  String(numParticipants),
]

// Figma comment #86
export const classementClickOrganisation = ({
  isAdministator,
}: ClassementClickItem) => [
  'trackEvent',
  'Classement',
  'Click Organisation',
  isAdministator ? 'Administrator' : 'Participant',
]
