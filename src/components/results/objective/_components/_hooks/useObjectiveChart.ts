import {
  MAX_CARBON_FOOTPRINT,
  MIN_CARBON_FOOTPRINT,
  OVER_7_TONS_YEAR_OBJECTIVE,
  UNDER_7_TONS_YEAR_OBJECTIVE,
} from '@/components/results/objective/_constants/footprints'
import { useEffect, useRef, useState } from 'react'

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

export const useObjectiveChart = (carbonFootprint: number) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [arrowRotation, setArrowRotation] = useState(26) // Default fallback

  const currentYear = new Date().getFullYear()

  const allPoints: Point[] = [
    { year: currentYear, value: carbonFootprint, isCurrent: true },
    ...POINTS.filter(({ value }) =>
      carbonFootprint < MAX_CARBON_FOOTPRINT
        ? value !== MAX_CARBON_FOOTPRINT
        : true
    ),
  ]

  // Calculate coordinates
  // Distribute points equally on X axis
  const getCoordinates = (index: number) => {
    // X goes from 10% to 60%
    const scaleMinX = 10
    const scaleMaxX = 60
    const x =
      scaleMinX + (index / (allPoints.length - 1)) * (scaleMaxX - scaleMinX)

    // Y goes from 20% to 80% (straight line)
    // We ignore the value for Y to ensure straight line alignment as requested
    const scaleMinY = 20
    const scaleMaxY = 80

    // Determine Y based on X to follow the slope
    // But since X is linear with index, Y can also be linear with index
    const y =
      scaleMinY + (index / (allPoints.length - 1)) * (scaleMaxY - scaleMinY)

    return { x, y }
  }

  const pointsWithCoords = allPoints.map((p, index) => ({
    ...p,
    ...getCoordinates(index),
  }))
  const firstPoint = pointsWithCoords[0]
  const lastPoint = pointsWithCoords[pointsWithCoords.length - 1]

  // Shorten the line by approx 15px to account for the arrow offset
  const shortenX = 1.3
  const shortenY = 2.2

  const shortenedLastPointIndex = pointsWithCoords.length - 1
  const pathPoints = [...pointsWithCoords]
  pathPoints[shortenedLastPointIndex] = {
    ...lastPoint,
    x: lastPoint.x - shortenX,
    y: lastPoint.y - shortenY,
  }

  const linePath = pathPoints.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    return `${acc} L ${p.x} ${p.y}`
  }, '')

  useEffect(() => {
    if (!containerRef.current) return

    const calculateRotation = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()

      // Calculate the visual angle of the line
      // The line goes from (10% x, 20% y) to (60% x, 80% y)
      // dx = 50% of width, dy = 60% of height
      const dx = 0.45 * width
      const dy = 0.6 * height

      if (dx === 0) return

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      setArrowRotation(angle)
    }

    calculateRotation()

    const observer = new ResizeObserver(calculateRotation)
    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  return {
    containerRef,
    firstPoint,
    lastPoint,
    linePath,
    arrowRotation,
    pointsWithCoords,
  }
}
