import { HTMLAttributes } from 'react'

type Props = {
  number: number
  onClick?: () => void
}

export default function NotificationBubble({
  number,
  onClick,
  ...props
}: Props & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`absolute -top-3 right-4 h-10 w-10 rounded-sm text-center ${
        onClick ? 'cursor-pointer' : ''
      }`}
      {...props}>
      <svg
        className="w-10"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg">
        <path
          className="fill-primary-700"
          d="M17.12 49.128A22.887 22.887 0 0 1 13 36c0-12.703 10.297-23 23-23s23 10.297 23 23-10.297 23-23 23c-3.758 0-7.302-.907-10.435-2.505l-4.814 2.052-5.728 2.443 1.084-6.132z"
        />
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={2}
          d="M17.12 49.128A22.887 22.887 0 0 1 13 36c0-12.703 10.297-23 23-23s23 10.297 23 23-10.297 23-23 23c-3.758 0-7.302-.907-10.435-2.505l-4.814 2.052-5.728 2.443 1.084-6.132z"
        />
        <text
          xmlSpace="preserve"
          className="text-center text-2xl"
          x={28.883}
          y={45.06}>
          <tspan x={28.883} y={45.06} className="fill-white font-bold"></tspan>
        </text>
      </svg>
      <span className="left-50 absolute top-2 -translate-x-1/2 font-bold text-white">
        {number}
      </span>
    </button>
  )
}
