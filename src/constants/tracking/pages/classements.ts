// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #83
export const classementCreateGroup = [
  'trackEvent',
  'Classements',
  'Create Group',
]

// Figma comment #84
export const classementCreateOrganisation = [
  'trackEvent',
  'Classements',
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
  'Classements',
  'Click Group',
  isAdministator ? 'Administrator' : 'Participant',
  String(numParticipants),
]

// Figma comment #86
export const classementClickOrganisation = ({
  isAdministator,
}: ClassementClickItem) => [
  'trackEvent',
  'Classements',
  'Click Organisation',
  isAdministator ? 'Administrator' : 'Participant',
]
