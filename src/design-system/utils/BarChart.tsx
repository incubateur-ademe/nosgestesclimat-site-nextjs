import { motion } from 'framer-motion'

type Props = {
  type: 'vertical' | 'horizontal'
  value: string
  index?: number
  color?: string
}

export default function BarChart({ type, value, color, index = 0 }: Props) {
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={`min-w-[2px] max-w-full ${
        propertyAffected === 'width' ? 'h-[12px]' : 'w-[12px]'
      } ${color ?? 'bg-secondary-700'} rotate-180 rounded-xl`}
      initial={{ [propertyAffected]: 0 }}
      animate={{
        [propertyAffected]: value,
      }}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
    />
  )
}
