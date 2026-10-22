import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MobileStickyCta from '../MobileStickyCta'

vi.mock('@/hooks/iframe/useShouldHideIfIframe', () => ({
  useShouldHideIfIframe: () => false,
}))

// Top of the inline CTA, relative to the viewport (768px high in jsdom)
let inlineCtaTop = 0

function renderCta() {
  render(
    <MobileStickyCta stickyCta={<span>sticky CTA</span>}>
      <span>inline CTA</span>
    </MobileStickyCta>
  )
}

function scrollInlineCtaTo(top: number) {
  inlineCtaTop = top
  act(() => {
    fireEvent.scroll(window)
    vi.advanceTimersToNextFrame()
  })
}

// The banner stays mounted to slide out: hidden means inert
function isPinned() {
  return !screen.getByText('sticky CTA').closest('[inert]')
}

describe('MobileStickyCta', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
    })
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () => ({ top: inlineCtaTop }) as DOMRect
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('pins the CTA while the inline one is below the fold', () => {
    inlineCtaTop = 900

    renderCta()

    expect(screen.getByText('inline CTA')).toBeInTheDocument()
    expect(isPinned()).toBe(true)
  })

  it('keeps the CTA pinned while the inline one is hidden behind it', () => {
    inlineCtaTop = 900
    renderCta()

    scrollInlineCtaTo(700)

    expect(isPinned()).toBe(true)
  })

  it('unpins the CTA once the inline one shows up', () => {
    inlineCtaTop = 900
    renderCta()

    scrollInlineCtaTo(600)

    expect(isPinned()).toBe(false)
  })

  it('does not pin the CTA once the user has scrolled past the inline one', () => {
    inlineCtaTop = 900
    renderCta()

    scrollInlineCtaTo(-300)

    expect(isPinned()).toBe(false)
  })

  it('pins the CTA again after a jump back to the top', () => {
    inlineCtaTop = 900
    renderCta()
    scrollInlineCtaTo(-300)

    scrollInlineCtaTo(900)

    expect(isPinned()).toBe(true)
  })
})
