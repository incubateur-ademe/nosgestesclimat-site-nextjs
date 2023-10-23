import { useForm } from '@/publicodes-state'
import { useState } from 'react'
import BarChart from './charts/BarChart'
import InlineChart from './charts/InlineChart'

export default function Charts() {
  const { currentCategory } = useForm()
  const [isBarChartVisible, setIsBarChartVisible] = useState(false)
  if (!currentCategory) return
  return (
    <div className="flex flex-col pb-24">
      <InlineChart />
      <button
        className="mx-auto"
        onClick={() =>
          setIsBarChartVisible(
            (prevIsBarChartVisible) => !prevIsBarChartVisible
          )
        }>
        <svg
          width="384"
          height="300"
          viewBox="0 0 384 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 22.0001C0 10.2181 9.55136 0.666748 21.3333 0.666748H362.667C374.449 0.666748 384 10.2181 384 22.0001C384 33.7821 374.449 43.3334 362.667 43.3334H21.3333C9.55136 43.3334 0 33.7821 0 22.0001ZM0 150C0 138.218 9.55136 128.667 21.3333 128.667H234.667C246.449 128.667 256 138.218 256 150C256 161.782 246.449 171.333 234.667 171.333H21.3333C9.55136 171.333 0 161.782 0 150ZM0 278C0 266.218 9.55136 256.667 21.3333 256.667H128C139.782 256.667 149.333 266.218 149.333 278C149.333 289.782 139.782 299.333 128 299.333H21.3333C9.55136 299.333 0 289.782 0 278Z"
            className="fill-gray-500"
          />
        </svg>
      </button>
      {isBarChartVisible ? <BarChart /> : null}
    </div>
  )
}
