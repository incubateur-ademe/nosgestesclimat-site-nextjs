import { twMerge } from 'tailwind-merge'

export default function Separator({ className = '' }) {
  return (
    <div
      className={twMerge(
        'my-8 h-[3px] w-12 rounded-full bg-secondary-700',
        className
      )}
    />
  )
}
