import Label from '@/components/form/question/Label'
import NumberInput from '@/components/form/question/NumberInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  question: string
}

export default function ThreeYearsInput({ question }: Props) {
  const { t } = useClientTranslation()

  const { unit, numericValue, setValue } = useRule(question)

  const [value2023, setValue2023] = useState(0)
  const [value2022, setValue2022] = useState(0)
  const [value2021, setValue2021] = useState(0)

  useEffect(() => {
    const computedValue = (value2023 + value2022 + value2021) / 3
    if (numericValue !== computedValue && computedValue) {
      setValue(computedValue)
    }
  }, [value2023, value2022, value2021, numericValue, setValue])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-2 rounded-lg bg-white p-4">
      <Label question={question} size="sm" label="2023" />
      <NumberInput
        unit={unit}
        value={value2023}
        setValue={(value: number) => setValue2023(value)}
        isMissing={value2023 ? false : true}
        size="sm"
        className="mb-2 justify-start"
      />
      <Label question={question} size="sm" label="2022" />
      <NumberInput
        unit={unit}
        value={value2022}
        setValue={(value: number) => setValue2022(value)}
        isMissing={value2022 ? false : true}
        size="sm"
        className="mb-2 justify-start"
      />

      <Label question={question} size="sm" label="2021" />
      <NumberInput
        unit={unit}
        value={value2021}
        setValue={(value: number) => setValue2021(value)}
        isMissing={value2021 ? false : true}
        size="sm"
        className="mb-2 justify-start"
      />
      <p className="mb-0 rounded-lg bg-primaryLight p-4 font-bold">
        {t('Total :')} {value2023 + value2022 + value2021}&nbsp;
        {unit}
        <br />
        {t('Total par an\u202f:')} {numericValue}&nbsp;{unit}
      </p>
    </motion.div>
  )
}
