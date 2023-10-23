import { PropsWithChildren } from 'react'
import emoji from 'react-easy-emoji'

export default function Emoji({ children }: PropsWithChildren) {
  return (
    // Emojis are decorative and don't need to be read by screen readers
    <span aria-hidden className="inline">
      {emoji(children, {
        baseUrl: 'https://twemoji.maxcdn.com/2/svg',
        ext: '.svg',
        size: '',
      })}
    </span>
  )
}
