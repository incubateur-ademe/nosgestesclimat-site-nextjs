// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #83
export const classementCreateGroup = ['trackEvent', 'Profil', 'Create Group']

// Figma comment #84
export const classementCreateOrganisation = [
  'trackEvent',
  'Profil',
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
  'Profil',
  'Click Group',
  isAdministator ? 'Administrator' : 'Participant',
  String(numParticipants),
]

// Figma comment #86
export const classementClickOrganisation = ({
  isAdministator,
}: ClassementClickItem) => [
  'trackEvent',
  'Profil',
  'Click Organisation',
  isAdministator ? 'Administrator' : 'Participant',
]
