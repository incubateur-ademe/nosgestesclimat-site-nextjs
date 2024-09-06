import { motion } from 'framer-motion'

type Props = {
  type: 'vertical' | 'horizontal'
  value: string
  index?: number
  color?: string
}

export default function BarChart({ type, value, color }: Props) {
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={`min-w-0.5 max-w-full ${
        propertyAffected === 'width' ? 'h-4' : 'w-4'
      } ${color ?? 'bg-secondary-700'} rotate-180 rounded-xl`}
      initial={{ [propertyAffected]: 0 }}
      animate={{
        [propertyAffected]: value,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
    />
  )
}
