import { toast } from 'react-toastify'

// Warning : this needs the ToastContainer to be rendered in the app
// to work properly
export function displayErrorToast(message: string) {
  toast.error(message, {
    autoClose: false,
  })
}
