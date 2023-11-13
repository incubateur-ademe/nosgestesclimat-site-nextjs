import { HTMLAttributes, PropsWithChildren } from 'react'
import emoji from 'react-easy-emoji'
import { twMerge } from 'tailwind-merge'

export default function Emoji({
  children = '...',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> &
  PropsWithChildren<{ className?: string; alt?: string }>) {
  return (
    // Emojis are decorative and don't need to be read by screen readers
    <span
      aria-hidden
      alt=""
      className={twMerge('inline', className)}
      {...props}>
      {emoji(children, {
        baseUrl: 'https://twemoji.maxcdn.com/2/svg',
        ext: '.svg',
        size: '',
      })}
    </span>
  )
}
