import { twMerge } from 'tailwind-merge'

export default function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={twMerge('inline-block fill-white', className)}
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6.62601H11.716L8.45801 3.36801L9.84406 2L15.46 7.60001L9.82605 13.234L8.45801 11.866L11.734 8.59H2.5V6.62601Z" />
    </svg>
  )
}
