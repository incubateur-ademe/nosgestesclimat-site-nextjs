import { twMerge } from 'tailwind-merge'

export default function CloudIcon({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('inline-block stroke-default', className)}>
      <path
        d="M5.5 15C3.01472 15 1 12.9853 1 10.5C1 8.15643 2.79151 6.23129 5.07974 6.01937C5.54781 3.17213 8.02024 1 11 1C13.9798 1 16.4522 3.17213 16.9203 6.01937C19.2085 6.23129 21 8.15643 21 10.5C21 12.9853 18.9853 15 16.5 15C12.1102 15 9.3433 15 5.5 15Z"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
