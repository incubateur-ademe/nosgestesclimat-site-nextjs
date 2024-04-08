import { motion } from 'framer-motion'

type Props = {
  type: 'vertical' | 'horizontal'
  value: string
  index?: number
}

export default function BarChart({ type, value, index = 0 }: Props) {
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={`min-w-[2px] max-w-full ${
        propertyAffected === 'width' ? 'h-[8px]' : 'w-[8px]'
      } rotate-180 rounded-lg bg-orange-default`}
      initial={{ [propertyAffected]: 0, display: 'none' }}
      animate={{
        [propertyAffected]: value,
        display: 'block',
      }}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
    />
  )
}
