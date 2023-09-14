'use client'

import { Release } from '@/types/translation'
import { useRouter } from 'next/navigation'
import { getPath } from '../../_helpers/getPath'

type Props = {
  releases: Release[]
  selectedReleaseIndex: number
}

export default function ReleaseSelect({
  releases,
  selectedReleaseIndex,
}: Props) {
  const router = useRouter()

  return (
    <select
      className="block md:hidden"
      value={selectedReleaseIndex}
      onChange={(evt) => {
        console.log('evt:', evt)
        console.log('target:', evt.target)
        router.push(getPath(Number(evt.target.value), releases))
      }}>
      {releases.map(({ name }: { name: string }, index: number) => (
        <option key={index} value={index} className="hover:!text-white">
          {name}
        </option>
      ))}
    </select>
  )
}
