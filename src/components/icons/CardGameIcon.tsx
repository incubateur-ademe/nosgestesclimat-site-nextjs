export default function CardCameIcon({ number = 0, className = '' }) {
  return (
    <svg
      className={`h-auto w-8 ${className}`}
      aria-hidden="true"
      width="210mm"
      height="210mm"
      viewBox="0 0 210 210"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="game-card-1"
        width={105.196}
        height={151.336}
        x={-6.543}
        y={61.501}
        ry={13.789}
        transform="matrix(.9632 -.26876 .34952 .93693 0 0)"
      />
      <rect
        className="game-card-2"
        width={106.168}
        height={149.549}
        x={36.923}
        y={46.396}
        ry={13.626}
        transform="matrix(.99154 -.12978 .17238 .98503 0 0)"
      />
      <rect
        className={`game-card-3 ${number > 0 ? 'game-card-3-active' : ''}`}
        width={106.469}
        height={148.988}
        x={76.231}
        y={26.167}
        ry={13.575}
      />
      {number > 0 && (
        <text xmlSpace="preserve" className="game-card-number">
          <tspan
            style={{
              fontSize: '102.827px',
              strokeWidth: 0.385599,
            }}
            x={100}
            y={135}
          >
            {number}
          </tspan>
        </text>
      )}
    </svg>
  )
}
