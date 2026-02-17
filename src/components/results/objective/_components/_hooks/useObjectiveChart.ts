import {
  MAX_CARBON_FOOTPRINT,
  MIN_CARBON_FOOTPRINT,
  OVER_7_TONS_YEAR_OBJECTIVE,
  UNDER_7_TONS_YEAR_OBJECTIVE,
} from '@/components/results/objective/_constants/footprints'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Point {
  year: number
  value: number
  isCurrent?: boolean
}

const POINTS: Point[] = [
  { year: OVER_7_TONS_YEAR_OBJECTIVE, value: MAX_CARBON_FOOTPRINT },
  { year: UNDER_7_TONS_YEAR_OBJECTIVE, value: MIN_CARBON_FOOTPRINT },
  { year: 2050, value: 2000 },
]

const CURRENT_YEAR = new Date().getFullYear()

const getCoordinates = ({
  index,
  allPoints,
}: {
  index: number
  allPoints: Point[]
}) => {
  // Leave space for animation on the left
  // and the text on the right
  const scaleMinX = 10
  const scaleMaxX = 60
  const x =
    scaleMinX + (index / (allPoints.length - 1)) * (scaleMaxX - scaleMinX)

  // Start high (20% from top) and end low (80% from top)
  // to create a descending slope representing the reduction
  const scaleMinY = 20
  const scaleMaxY = 90

  // Determine Y based on X to follow the slope
  const y =
    scaleMinY + (index / (allPoints.length - 1)) * (scaleMaxY - scaleMinY)

  return { x, y }
}

const computeChartData = (carbonFootprint: number) => {
  const allPoints: Point[] = [
    { year: CURRENT_YEAR, value: carbonFootprint, isCurrent: true },
    // Filter out 2030 step if the footprint is below 7T
    ...POINTS.filter(({ value }) =>
      carbonFootprint < MAX_CARBON_FOOTPRINT
        ? value !== MAX_CARBON_FOOTPRINT
        : true
    ),
  ]

  const pointsWithCoords = allPoints.map((p, index) => ({
    ...p,
    ...getCoordinates({ index, allPoints }),
  }))

  const firstPoint = pointsWithCoords[0]
  const lastPoint = pointsWithCoords[pointsWithCoords.length - 1]

  const lastPointIndex = pointsWithCoords.length - 1
  const pathPoints = [...pointsWithCoords]

  // Calculate vector from start to end
  const dx = lastPoint.x - firstPoint.x
  const dy = lastPoint.y - firstPoint.y

  // Calculate length of the full segment
  const length = Math.sqrt(dx * dx + dy * dy)

  // Define how much we want to shorten the line (in % units approx)
  // this allows the arrow to reach the outline of the last dot
  const shortenDistance = 2

  // Normalize vector and scale by shortenDistance
  const shortenX = (dx / length) * shortenDistance
  const shortenY = (dy / length) * shortenDistance

  pathPoints[lastPointIndex] = {
    ...lastPoint,
    x: lastPoint.x - shortenX,
    y: lastPoint.y - shortenY,
  }

  const linePath = pathPoints.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    return `${acc} L ${p.x} ${p.y}`
  }, '')

  return {
    firstPoint,
    lastPoint,
    linePath,
    pointsWithCoords,
  }
}

export const useObjectiveChart = (carbonFootprint: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [arrowRotation, setArrowRotation] = useState(26)

  const { firstPoint, lastPoint, linePath, pointsWithCoords } = useMemo(
    () => computeChartData(carbonFootprint),
    [carbonFootprint]
  )

  useEffect(() => {
    if (!containerRef.current) return

    const calculateRotation = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()

      const x1 = (firstPoint.x / 100) * width
      const y1 = (firstPoint.y / 100) * height
      const x2 = (lastPoint.x / 100) * width
      const y2 = (lastPoint.y / 100) * height

      const dx = x2 - x1
      const dy = y2 - y1

      if (dx === 0) return

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI

      setArrowRotation(angle)
    }

    calculateRotation()

    const observer = new ResizeObserver(calculateRotation)
    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [firstPoint, lastPoint])

  return {
    containerRef,
    firstPoint,
    lastPoint,
    linePath,
    arrowRotation,
    pointsWithCoords,
  }
}
