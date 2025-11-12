import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles.scss"

export const ToastProvider = () => (
  <ToastContainer
    newestOnTop={false}
    closeOnClick
    rtl={false}
    theme="colored"
  />
)