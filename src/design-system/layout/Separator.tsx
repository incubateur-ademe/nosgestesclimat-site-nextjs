import { twMerge } from 'tailwind-merge'

export default function Separator({ className = '' }) {
  return (
    <div className={twMerge('bg-secondary-700 my-8 h-[3px] w-12', className)} />
  )
}
