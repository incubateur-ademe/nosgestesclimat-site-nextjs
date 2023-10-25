'use client'

import { ForwardedRef, useEffect, useRef, useState } from 'react'
import IllustrationSVG from './IllustrationSVG'

export default function AnimatedIllustration({
  small,
  className,
}: {
  small?: boolean
  className?: string
}) {
  const [isCycling, setIsCycling] = useState(false)
  const svgRef = useRef<SVGElement & { onclick: () => void }>()

  useEffect(() => {
    if (!svgRef.current) return

    svgRef.current.onclick = () => setIsCycling(true)
  }, [svgRef])

  return (
    <div
      aria-hidden="true"
      className={`landing-animated-illustration ${
        isCycling ? 'landing-animated-illustration--cycling' : ''
      } ${small} ${className}`}
    >
      <IllustrationSVG ref={svgRef as unknown as ForwardedRef<SVGSVGElement>} />
    </div>
  )
}
