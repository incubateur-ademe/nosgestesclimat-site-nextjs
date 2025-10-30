export type MonEspaceTab = 'results' | 'actions' | 'groups' | 'settings'

export const monEspaceTabTrackEvent = (tab: MonEspaceTab) => [
  'trackEvent',
  'MonEspace',
  'Click Tab',
  tab.charAt(0).toUpperCase() + tab.slice(1),
]

export const captureClickMonEspaceTab = ({ tab }: { tab: MonEspaceTab }) => ({
  eventName: 'click tab mon espace',
  properties: { tab },
})
