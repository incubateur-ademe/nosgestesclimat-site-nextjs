import posthog, { type PostHogConfig } from 'posthog-js'

export type PostHogCookieState = 'accepted' | 'refused' | 'do_not_track'

export class PostHog {
  constructor(cookieState: PostHogCookieState) {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      return
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      cookieless_mode: 'on_reject',
      defaults: '2025-11-30',
      autocapture: false,
      capture_pageview: false,
      custom_campaign_params: [
        'mtm_campaign',
        'mtm_kwd',
        'mtm_keyword',
        'organisation',
        'poll',
      ],
    })
    if (cookieState === 'do_not_track') {
      this.switchDNTOn()
    }
  }

  update(cookieState: PostHogCookieState) {
    // Set config to cookieless mode, in case we come from DNT mode on
    posthog.set_config({
      cookieless_mode: 'on_reject',
    })
    switch (cookieState) {
      case 'accepted':
        posthog.opt_in_capturing()
        break

      case 'refused':
        posthog.reset()
        posthog.opt_out_capturing()
        break

      case 'do_not_track':
        this.switchDNTOn()
        break
    }
  }

  private switchDNTOn() {
    posthog.set_config({
      // Force type because type false is not listed, but does indeed have the desired behaviour
      cookieless_mode: false as unknown as PostHogConfig['cookieless_mode'],
    })
    posthog.opt_out_capturing()
  }
}
