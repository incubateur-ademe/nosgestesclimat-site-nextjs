import { motion } from 'framer-motion'

type Props = {
  type: 'vertical' | 'horizontal'
  percentage: number
  maxWidth: string
}

export default function BarChart({ type, percentage, maxWidth }: Props) {
  const propertyAffected = type === 'vertical' ? 'height' : 'width'

  return (
    <motion.div
      className={`${
        propertyAffected === 'width' ? 'h-[8px]' : 'w-[8px]'
      } rotate-180 rounded-lg bg-secondary`}
      initial={{ [propertyAffected]: 0, display: 'none' }}
      animate={{
        [propertyAffected]: `calc(${percentage} * ${maxWidth})`,
        display: 'block',
      }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    />
  )
}
