import { twMerge } from 'tailwind-merge'

export default function SaveCheckIcon({
  className,
  ...props
}: {
  className?: string
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-default inline-block stroke-[1.5]', className)}
      {...props}>
      <path d="M19.92,6.13c-.08-.31-.2-.6-.36-.87-.19-.3-.44-.56-.73-.85-.02,0-.04-.03-.06-.05l-3.06-3.07-.07-.06s-.04-.04-.05-.06c-.29-.29-.55-.54-.85-.73-.27-.16-.56-.28-.87-.36-.35-.08-.71-.08-1.11-.08h-7.83c-.44.01-.84.02-1.18.04-.56.05-1.08.15-1.57.4-.75.38-1.36.99-1.74,1.74C.19,2.67.09,3.19.04,3.75c-.04.54-.04,1.2-.04,2.01v8.48c0,.81,0,1.47.04,2.01.05.56.15,1.08.4,1.57.38.75.99,1.36,1.74,1.74.49.25,1.01.35,1.57.4.34.02.74.03,1.18.04h7.77c-.16-.34-.25-.71-.25-1.1,0-.31.06-.62.17-.9h-6.62v-5.4c0-.3,0-.46.01-.58h.01c.12-.02.28-.02.58-.02h6.8c.3,0,.46,0,.58.01h.01c.01.13.01.29.01.59v3.98c.64-.25,1.37-.24,2,.05v-4.06c0-.25,0-.5-.02-.71-.02-.23-.06-.5-.2-.77-.19-.37-.5-.68-.87-.87-.27-.14-.54-.18-.77-.2-.21-.02-.46-.02-.71-.02h-6.86c-.25,0-.5,0-.71.02-.23.02-.5.06-.77.2-.37.19-.68.5-.87.87-.14.27-.18.54-.2.77-.02.21-.02.46-.02.71v5.4s-.06,0-.09,0c-.44-.03-.66-.1-.82-.18-.37-.19-.68-.5-.87-.87-.08-.16-.15-.38-.18-.82-.04-.45-.04-1.03-.04-1.89V5.8c0-.86,0-1.44.04-1.89.03-.44.1-.66.18-.82.19-.37.5-.68.87-.87.16-.08.38-.15.82-.18.03,0,.06,0,.09,0v2.4c0,.25,0,.5.02.71.02.23.06.5.2.77.19.37.5.68.87.87.27.14.54.18.77.2.21.02.46.02.71.02h6.86c.25,0,.5,0,.71-.02.23-.02.5-.06.77-.2.37-.19.68-.5.87-.87.14-.27.18-.54.2-.77.02-.21.02-.46.02-.71v-.02l1.36,1.36c.38.38.45.46.49.54.06.09.1.18.12.28.02.09.03.2.03.74v6.87c0,.86,0,1.44-.04,1.89-.01.11-.02.21-.03.29l1.75-1.75c.1-.1.21-.19.32-.27v-7.12c0-.4,0-.76-.08-1.11ZM14,4.4c0,.3,0,.46-.01.58h-.01c-.12.02-.28.02-.58.02h-6.8c-.3,0-.46,0-.58-.01h-.01c-.01-.13-.01-.29-.01-.59v-2.4h6.67c.54,0,.65.01.73.03.11.02.2.06.29.12.06.03.12.08.31.27v1.98Z" />
      <path d="M22.16,17.11l-4.5,4.5c-.39.39-1.03.39-1.42,0l-2-2c-.39-.39-.39-1.03,0-1.42s1.03-.39,1.42,0l1.29,1.3,2.98-2.99.81-.81c.39-.39,1.03-.39,1.42,0,.39.39.39,1.03,0,1.42Z" />
      <path
        className="fill-green-500"
        d="M22.16,15.69c.39.39.39,1.02,0,1.41l-4.5,4.5c-.39.39-1.02.39-1.41,0l-2-2c-.39-.39-.39-1.02,0-1.41.39-.39,1.02-.39,1.41,0l1.29,1.29,3.79-3.79c.39-.39,1.02-.39,1.41,0Z"
      />
    </svg>
  )
}
