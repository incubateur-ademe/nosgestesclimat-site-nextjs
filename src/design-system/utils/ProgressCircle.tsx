import { motion } from 'framer-motion'

const ProgressCircle = ({
  progress = 0,
  pathLength = 0,
  white = false,
  className = '',
}) => (
  <svg
    aria-label="Avancement du test"
    role="progressbar"
    aria-valuenow={Math.round(progress * 100)}
    viewBox="0 0 50 50"
    className={`w-8 ${className}`}>
    <motion.path
      fill="none"
      strokeWidth="5"
      className="fill-none stroke-primary-700"
      strokeDasharray="0 1"
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      style={{
        pathLength,
        rotate: 90,
        translateX: 5,
        translateY: 5,
        scaleX: -1, // Reverse direction of line animation
      }}
    />
    <motion.path
      className={white ? 'fill-white' : 'fill-primary-700'}
      d="m 18.534541,15.018064 c -1.58737,-0.861757 -3.518988,0.286942 -3.519769,2.093145 v 21.013545 c 1.92e-4,1.748524 1.82088,2.901392 3.401567,2.153887 l 19.119987,-9.943674 c 1.756746,-0.830534 1.834232,-3.301494 0.132976,-4.240468 -4.17354,-2.305026 -12.241434,-7.330221 -19.134761,-11.076435 z"
      strokeDasharray="0 1"
      transform="translate(-0 -3)"
      animate={{ display: progress === 1 ? 'none' : 'block' }}
    />
    <motion.path
      fill="none"
      strokeWidth="5"
      className="stroke-primary-700"
      d="M14,26 L 22,33 L 35,16"
      initial={false}
      strokeDasharray="0 1"
      animate={{ pathLength: progress === 1 ? 1 : 0 }}
    />
  </svg>
)

export default ProgressCircle
