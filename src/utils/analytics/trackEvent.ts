import posthog from 'posthog-js'

const shouldNotTrack = false
//process.env.NODE_ENV === 'development'

const shouldLogTracking = false

export const trackPosthogEvent = (args: {
  eventName: string
  properties?: Record<string, string | number | boolean | null | undefined>
}) => {
  if (shouldLogTracking) {
    console.log(args)
    console.debug('posthog', `"${args.eventName}" =>`, args.properties)
  }

  if (shouldNotTrack) {
    return
  }

  posthog.capture(args.eventName, { ...args.properties })
}
