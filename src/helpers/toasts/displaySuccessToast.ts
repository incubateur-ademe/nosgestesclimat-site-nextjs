import { toast } from 'react-toastify'

// Warning : this needs the ToastContainer to be rendered in the app
// to work properly
export function displaySuccessToast(message: string) {
  toast.success(message)
}
