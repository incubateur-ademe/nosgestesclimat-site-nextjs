import { twMerge } from 'tailwind-merge'

export default function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      id="emoji"
      viewBox="0 0 72 72"
      version="1.1"
      className={twMerge('h-8 w-8', className)}>
      <defs id="defs222" />
      <g
        id="line"
        transform="matrix(1.1584183,0,0,1.1584183,-3.8887895,-6.8295539)"
        className="stroke-primary-700">
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.27522"
          d="m 59.146963,64.24551 c 0,0 1.710487,-0.736913 0.572876,-5.287357 C 58.342307,53.445633 55.061154,48.487086 48.23549,48.487086 H 23.208056 c -6.825664,0 -9.890331,4.958547 -11.267863,10.471067 -1.137611,4.550444 0.102219,5.238763 0.102219,5.238763 0,0 10.60906,-1.496241 23.25451,-1.518873 13.744885,0.05443 23.850041,1.567467 23.850041,1.567467 z"
          id="path214-3"
          style={{
            // strokeWidth: 3.26266,
            strokeLinecap: 'butt',
            strokeDasharray: 'none',
            strokeOpacity: 1,
          }}
          className="stroke fill-primary-200"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.27522"
          className="stroke-primary-700"
          d="m 60.549521,63.348606 c 0,0 0,-2.27522 -1.137611,-6.825664 -1.377532,-5.51252 -4.550442,-9.100884 -11.376106,-9.100884 -5.688053,0 -17.06416,0 -25.027434,0 -6.825664,0 -9.998574,3.588364 -11.376106,9.100884 -1.137611,4.550444 -1.137611,6.825664 -1.137611,6.825664"
          id="path214"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinejoin="round"
          strokeWidth="2.27522"
          d="m 24.145981,24.669844 c 0,4.237145 0.613285,8.883147 2.27522,11.376107 2.117435,3.177346 5.708076,4.550443 9.100886,4.550443 3.521701,0 6.981175,-1.373097 9.100885,-4.550443 1.660911,-2.49296 2.275221,-7.138962 2.275221,-11.376107 0,-3.177914 -1.137611,-13.651327 -11.376106,-13.651327 -10.238496,0 -11.376106,8.35484 -11.376106,13.651327 z"
          id="path216"
          className="fill-primary-200 stroke-primary-700"
        />
      </g>
    </svg>
  )
}
