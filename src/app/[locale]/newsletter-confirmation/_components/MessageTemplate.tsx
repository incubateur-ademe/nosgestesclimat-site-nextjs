import { type ReactNode } from 'react'

export default function MessageTemplate({
  title,
  body,
  buttonElement,
}: {
  title: ReactNode
  body: ReactNode
  buttonElement: ReactNode
}) {
  return (
    <>
      <h1 className="mb-4 px-3 text-lg md:px-0 md:text-xl">{title}</h1>

      <p className="mb-10 px-3 md:px-0">{body}</p>

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        {buttonElement}
      </div>
    </>
  )
}
