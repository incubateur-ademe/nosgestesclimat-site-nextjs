import PostalCodeInput from '@/design-system/inputs/PostalCodeInput'
import { useInseeCode } from '@/hooks/useInseeCode'
import { useInseeCodeParams } from '@/hooks/useInseeCodeParams'
import { useEffect, useState } from 'react'

export default function InseeCodeInput() {
  const [postalCode, setPostalCode] = useState('')

  const { inseeCode } = useInseeCode({ postalCode })

  const { setInseeCode } = useInseeCodeParams()
  useEffect(() => {
    setInseeCode(inseeCode)
  }, [inseeCode, setInseeCode])

  return (
    <div className="hidden">
      <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />
    </div>
  )
}
