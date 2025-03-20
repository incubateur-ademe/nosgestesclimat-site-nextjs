import type { KeyboardEvent } from 'react'

export const onKeyDownHelper =
  (
    callback: (
      event: KeyboardEvent<
        HTMLInputElement | HTMLButtonElement | HTMLDivElement
      >
    ) => void
  ) =>
  (
    event: KeyboardEvent<HTMLInputElement | HTMLButtonElement | HTMLDivElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      callback(event)
    }
  }
