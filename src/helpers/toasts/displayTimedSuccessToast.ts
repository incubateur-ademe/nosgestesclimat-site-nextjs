import { toast } from 'react-toastify'

// Warning : this needs the ToastContainer to be rendered in the app
// to work properly
export function displayTimedSuccessToast(
  message: string,
  callback: () => void
) {
  toast.success(message, {
    autoClose: 30000,
    onClose: callback,
  })
}
