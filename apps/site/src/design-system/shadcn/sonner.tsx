import CheckCircleIcon from '@/components/icons/status/CheckCircleIcon'
import {
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group left-0! sm:left-auto!"
      icons={{
        success: (
          <CheckCircleIcon className="mr-6 block size-6 min-w-6 fill-green-600" />
        ),
        info: <InfoIcon className="mr-4 size-5 stroke-blue-500" />,
        warning: (
          <TriangleAlertIcon className="mr-4 size-5 stroke-orange-500" />
        ),
        error: <OctagonXIcon className="mr-4 size-5 stroke-red-500" />,
        loading: <Loader2Icon className="mr-4 size-5 animate-spin" />,
      }}
      closeButton
      toastOptions={{
        classNames: {
          toast: `font-marianne flex! w-full! items-center! rounded-full! bg-white p-4!
            text-base! font-medium! after:content-none! sm:w-104! [&>div]:w-auto!
            [&:has([data-action])_[data-close-button]]:border-l-0!
            [&:has([data-action])_[data-close-button]]:pl-0!`,
          closeButton: `[&>svg]:-mr-1! [&>svg]:-ml-1! [&>svg]:size-6!
          relative! order-1! m-0! ml-4! h-6! w-auto! pl-4! rounded-none!
          border-t-0! border-r-0! border-b-0! border-l!
          transform-none! transition-transform!
          hover:bg-white! active:scale-90!`,
          // The separator moves from the close button to the action button. It
          // is drawn outside of the button so the focus ring only wraps the label
          actionButton: `relative! m-0! ml-8! h-6! p-0! rounded-xs! bg-transparent!
          text-base! leading-6! font-medium! text-primary-700! underline!
          before:absolute before:-left-4 before:h-6 before:w-px before:bg-slate-200
          transition-colors! hover:text-primary-800!
          focus-visible:ring-2! focus-visible:ring-primary-700!
          focus-visible:ring-offset-3! focus-visible:outline-hidden!`,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
