import { type ReactNode } from 'react'

export default function TutorialListItem({
  index,
  title,
}: {
  index: number
  title: ReactNode
}) {
  return (
    <li className="bg-primary-100 mx-auto flex w-3xl max-w-full items-center gap-4 rounded-lg p-4 md:p-6">
      <p className="mb-0 flex text-left text-sm md:text-base">
        <span className="bg-primary-800 mr-4 inline-flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full text-lg font-bold text-white">
          {index}
        </span>
        <span className="block">{title}</span>
      </p>
    </li>
  )
}
