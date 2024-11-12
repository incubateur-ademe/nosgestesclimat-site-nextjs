import { twMerge } from 'tailwind-merge'

export default function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('inline-block fill-default', className)}>
      <path d="M16 13.5H13V16.5H11V13.5H8V11.5H11V8.5H13V11.5H16V13.5Z" />
    </svg>
  )
}
