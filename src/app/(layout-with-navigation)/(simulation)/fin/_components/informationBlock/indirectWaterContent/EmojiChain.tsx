import Emoji from '@/design-system/utils/Emoji'

type Props = {
  emojis: string[]
}

export default function EmojiChain({ emojis }: Props) {
  return (
    <div className="mb-3 flex items-center justify-center gap-1 text-2xl">
      {emojis.map((emoji, index) => (
        <>
          <Emoji>{emoji}</Emoji>
          {index < emojis.length - 1 && (
            <svg
              key={emoji + index}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 12L14 5V9H3.8C3.51997 9 3.37996 9 3.273 9.0545C3.17892 9.10243 3.10243 9.17892 3.0545 9.273C3 9.37996 3 9.51997 3 9.8V14.2C3 14.48 3 14.62 3.0545 14.727C3.10243 14.8211 3.17892 14.8976 3.273 14.9455C3.37996 15 3.51997 15 3.8 15H14V19L21 12Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </>
      ))}
    </div>
  )
}
