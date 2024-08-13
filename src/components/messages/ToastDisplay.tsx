import { marianne } from '@/app/layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { twMerge } from 'tailwind-merge'

type Props = {
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
  autoClose?: number
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  progress?: number
  progressClassName?: string
  className?: string
}

export default function ToastDisplay(props: Props) {
  return (
    <ToastContainer
      className={twMerge(props?.className ?? '', marianne.className)}
      aria-live="polite"
      position="bottom-right"
      {...props}
    />
  )
}
