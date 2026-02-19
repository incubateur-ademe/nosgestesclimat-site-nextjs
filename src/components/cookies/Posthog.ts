import posthog, { type PostHogConfig } from 'posthog-js'
import { COOKIE_STATE } from './cookieLocalStorage'

export type PostHogCookieState = 'accepted' | 'refused' | 'do_not_track'

export class PostHog {
  private intersectionObserverThreshold = 0.1

  update(cookieState: PostHogCookieState) {
    // if (!this.initialized) {
    //   throw new Error('Posthog not initialized')
    // }
    console.log('yay')
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
<<<<<<< HEAD

  init() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.initPosthog()
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: this.intersectionObserverThreshold, // Trigger when at least 10% of the page is visible
      }
    )

    observer.observe(document.body)
  }

  private initPosthog() {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      return
    }
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      cookieless_mode: 'on_reject',
      defaults: '2026-01-30',
      debug: true,
      person_profiles: 'identified_only',
      autocapture: false,
      // {
      //   capture_copied_text: false,
      //   css_selector_allowlist: ['[data-track]'],
      // },
      custom_campaign_params: [
        'mtm_campaign',
        'mtm_kwd',
        'mtm_keyword',
        'organisation',
        'poll',
      ], // Enable to set query parameters as properties on the events
    })
    if (COOKIE_STATE.posthog === 'do_not_track') {
      this.switchDNTOn()
    }
  }
||||||| parent of 6550ba2b6 (♻️ Refactor tracking and cookie management)
=======

  init() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.initPosthog()
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        threshold: this.intersectionObserverThreshold, // Trigger when at least 10% of the page is visible
      }
    )

    observer.observe(document.body)
  }

  private initPosthog() {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      return
    }
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      cookieless_mode: 'on_reject',
      defaults: '2026-01-30',
      debug: true,
      person_profiles: 'identified_only',
      autocapture: false,
      // {
      //   capture_copied_text: false,
      //   css_selector_allowlist: ['[data-track]'],
      // },
      custom_campaign_params: [
        'mtm_campaign',
        'mtm_kwd',
        'mtm_keyword',
        'organisation',
        'poll',
      ], // Enable to set query parameters as properties on the events
    })
    if (COOKIE_STATE.posthog === 'do_not_track') {
      this.switchDNTOn()
    }
    // posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    //   api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    //   // cookieless_mode: 'on_reject',
    //   defaults: '2025-11-30', // @TODO: last available date for the SDK we use. To be updated when being able to install a newer version of posthog-js (today restricted by minimumReleaseAge protection).
    //   autocapture: false, // Disable automatic event capture, as we capture manually. So we can control the events we send (and reduce our billing)
    //   capture_pageview: true,
    //   capture_pageleave: true,
    //   loaded: (ph) => {
    //     ph.debug()
    //   },
    //   custom_campaign_params: [
    //     'mtm_campaign',
    //     'mtm_kwd',
    //     'mtm_keyword',
    //     'organisation',
    //     'poll',
    //   ], // Enable to set query parameters as properties on the events
    // })
  }
>>>>>>> 6550ba2b6 (♻️ Refactor tracking and cookie management)
}
