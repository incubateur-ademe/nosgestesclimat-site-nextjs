import { twMerge } from 'tailwind-merge'

export default function Separator({ className = '' }) {
  return <div className={twMerge('h-[3px] w-12 bg-secondary', className)} />
}
