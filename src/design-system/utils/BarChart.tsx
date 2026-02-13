import { motion, useReducedMotion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface Props {
  type: 'vertical' | 'horizontal'
  value: string
  index?: number
  color?: string
  className?: string
  delay?: number
  width?: number
}

export default function BarChart({
  type,
  value,
  delay = 0.5,
  color,
  className,
  width,
}: Props) {
  const shouldReduceMotion = useReducedMotion()
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={twMerge(
        `max-w-full min-w-0 ${
          propertyAffected === 'width' ? 'h-4' : 'w-4'
        } ${color ?? 'bg-secondary-700'} rotate-180 rounded-xl`,
        className
      )}
      style={
        propertyAffected === 'width'
          ? {
              height: `${width}px`,
            }
          : { width: `${width}px` }
      }
      initial={{ [propertyAffected]: 0 }}
      animate={{
        [propertyAffected]: value,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: 'easeOut',
        delay: shouldReduceMotion ? 0 : delay,
      }}
    />
  )
}
