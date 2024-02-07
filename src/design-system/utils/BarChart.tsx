import { motion } from 'framer-motion'

type Props = {
  type: 'vertical' | 'horizontal'
  percentage: string
  index?: number
}

export default function BarChart({ type, percentage, index }: Props) {
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={`min-w-[2px] max-w-full ${
        propertyAffected === 'width' ? 'h-[8px]' : 'w-[8px]'
      } rotate-180 rounded-lg bg-secondary`}
      initial={{ [propertyAffected]: 0, display: 'none' }}
      animate={{
        [propertyAffected]: percentage,
        display: 'block',
      }}
      transition={{
        delay: 0.3,
        duration: 0.5 + 0.1 * (index ?? 0),
        ease: 'easeOut',
      }}
    />
  )
}
