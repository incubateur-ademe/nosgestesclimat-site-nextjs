import { twMerge } from 'tailwind-merge'

export default function DropIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('stroke-default inline-block stroke-2', className)}>
      <path
        d="M17 13C17 17.4183 13.4183 21 9 21C4.58172 21 1 17.4183 1 13C1 11.9391 1.20651 10.9264 1.58152 10C2.76829 7.06817 9 1 9 1C9 1 15.2317 7.06817 16.4185 10C16.7935 10.9264 17 11.9391 17 13Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
