import { twMerge } from 'tailwind-merge'

export default function RedoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('inline-block fill-default stroke-[1.5]', className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2929 4.29289C16.6834 3.90237 17.3166 3.90237 17.7071 4.29289L21.7071 8.29289C22.0976 8.68342 22.0976 9.31658 21.7071 9.70711L17.7071 13.7071C17.3166 14.0976 16.6834 14.0976 16.2929 13.7071C15.9024 13.3166 15.9024 12.6834 16.2929 12.2929L18.5858 10H7.5C5.567 10 4 11.567 4 13.5C4 15.433 5.567 17 7.5 17H12C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19H7.5C4.46243 19 2 16.5376 2 13.5C2 10.4624 4.46243 8 7.5 8H18.5858L16.2929 5.70711C15.9024 5.31658 15.9024 4.68342 16.2929 4.29289Z"
      />
    </svg>
  )
}
