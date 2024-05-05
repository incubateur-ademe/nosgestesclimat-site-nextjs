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
      className={twMerge('inline-block', className)}
      {...props}>
      {emoji(children, {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/svg',
        ext: '.svg',
        size: '',
        props: {
          className: 'border-none',
        },
      })}
    </span>
  )
}
