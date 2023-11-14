import { twMerge } from 'tailwind-merge'

export default function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('stroke-default inline-block', className)}>
      <g>
        <path
          d="M12 15C14.8995 15 17.25 12.6495 17.25 9.75C17.25 6.85051 14.8995 4.5 12 4.5C9.10051 4.5 6.75 6.85051 6.75 9.75C6.75 12.6495 9.10051 15 12 15Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9129 20.876C18.0071 19.9646 16.93 19.2412 15.7436 18.7476C14.5572 18.254 13.2849 17.9999 11.9999 17.9999C10.7149 17.9999 9.44261 18.254 8.25619 18.7476C7.06978 19.2412 5.9927 19.9646 5.08691 20.876"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3151_4681">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
