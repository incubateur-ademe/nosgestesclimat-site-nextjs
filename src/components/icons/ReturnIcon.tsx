import { twMerge } from 'tailwind-merge'

export default function ReturnIcon({
  className,
  ...props
}: {
  className?: string
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-default inline-block stroke-[1.5]', className)}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70711 4.29289C8.09763 4.68342 8.09763 5.31658 7.70711 5.70711L5.41421 8H16.5C19.5376 8 22 10.4624 22 13.5C22 16.5376 19.5376 19 16.5 19H12C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17H16.5C18.433 17 20 15.433 20 13.5C20 11.567 18.433 10 16.5 10H5.41421L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L2.29289 9.70711C1.90237 9.31658 1.90237 8.68342 2.29289 8.29289L6.29289 4.29289C6.68342 3.90237 7.31658 3.90237 7.70711 4.29289Z"
      />
    </svg>
  )
}
