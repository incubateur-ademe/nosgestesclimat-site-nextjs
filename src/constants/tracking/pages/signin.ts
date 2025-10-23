import type { AuthenticationMode } from '@/types/authentication'

export const captureClickSubmitEmail = ({
  mode,
}: {
  mode?: AuthenticationMode
}) => {
  return {
    eventName: 'click submit email',
    properties: {
      mode,
    },
  }
}

export const signinTrackEvent = (mode?: AuthenticationMode) => [
  'trackEvent',
  'Authentication',
  'Click Submit Email',
  mode ?? '',
]
