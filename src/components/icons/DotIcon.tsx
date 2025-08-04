import { twMerge } from 'tailwind-merge'

export default function DotIcon({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-default inline-block stroke-[1.5]', className)}
      aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
    </svg>
  )
}
