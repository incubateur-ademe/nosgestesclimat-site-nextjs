'use client'

import { twMerge } from 'tailwind-merge'

export default function PulsatingDot({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'group absolute h-6 w-6 cursor-pointer rounded-full bg-white shadow-lg',
        className
      )}>
      <div className="absolute inset-0 scale-[0.15] rounded-full bg-secondary-600 transition-all duration-300 group-hover:scale-[0.7]" />
    </div>
  )
}
