import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface Props {
  type: 'vertical' | 'horizontal'
  value: string
  index?: number
  color?: string
  className?: string
}

export default function BarChart({ type, value, color, className }: Props) {
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={twMerge(
        `max-w-full min-w-0.5 ${
          propertyAffected === 'width' ? 'h-4' : 'w-4'
        } ${color ?? 'bg-secondary-700'} rotate-180 rounded-xl`,
        className
      )}
      initial={{ [propertyAffected]: 0 }}
      animate={{
        [propertyAffected]: value,
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.5,
      }}
    />
  )
}
