import { HTMLAttributes, PropsWithChildren } from 'react'

export default function EmojiButton(
  props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
) {
  return (
    <button
      className="m-0 p-2 text-2xl transition-transform will-change-transform hover:scale-125"
      {...props}
    >
      {props.children}
    </button>
  )
}
