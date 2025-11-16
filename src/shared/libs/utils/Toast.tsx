import { toast, ToastOptions, Id as ToastId } from "react-toastify"
import i18next from "i18next"
import {Icon} from "../../assets/icons/Icon";
import {ICON_TYPES} from "../../assets/icons/types";

type ToastType = "success" | "error" | "warning" | "info"

const baseOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: true,
  icon: false,
  closeButton: false,
}

const getOptions = (opts?: ToastOptions): ToastOptions => ({
  ...baseOptions,
  ...opts,
})

const renderContent = (type: ToastType, messageKey: string, subtitleKey?: string) => (
  <div className="toast-content">
    <div className="toast-text">
      <div className="toast-title">{messageKey}</div>
      {subtitleKey && <div className="toast-subtitle">{subtitleKey}</div>}
    </div>
    <div className="toast-icon">
      {type === "success" &&  <Icon type={ICON_TYPES.toast_success}/>}
      {type === "warning" && <Icon type={ICON_TYPES.toast_warning}/>}
      {type === "error" && <Icon type={ICON_TYPES.toast_error} />}
      {type === "info" && <Icon type={ICON_TYPES.toast_info} />}
    </div>
  </div>
)

const normalizeArgs = ( 
  subtitleOrOpts?: string | ToastOptions,
  maybeOpts?: ToastOptions,
): { subtitle?: string; opts: ToastOptions } =>
  typeof subtitleOrOpts === "string"
    ? { subtitle: subtitleOrOpts, opts: maybeOpts || {} }
    : { subtitle: undefined, opts: subtitleOrOpts || {} }

export class Toast {
  static success(msg: string, subtitleOrOpts?: string | ToastOptions, maybeOpts?: ToastOptions): ToastId {
    const { subtitle, opts } = normalizeArgs(subtitleOrOpts, maybeOpts)
    return toast.success(renderContent("success", msg, subtitle), getOptions(opts))
  }

  static error(msg: string, subtitleOrOpts?: string | ToastOptions, maybeOpts?: ToastOptions): ToastId {
    const { subtitle, opts } = normalizeArgs(subtitleOrOpts, maybeOpts)
    return toast.error(renderContent("error", msg, subtitle), getOptions(opts))
  }

  static warning(msg: string, subtitleOrOpts?: string | ToastOptions, maybeOpts?: ToastOptions): ToastId {
    const { subtitle, opts } = normalizeArgs(subtitleOrOpts, maybeOpts)
    return toast.warning(renderContent("warning", msg, subtitle), getOptions(opts))
  }

  static info(msg: string, subtitleOrOpts?: string | ToastOptions, maybeOpts?: ToastOptions): ToastId {
    const { subtitle, opts } = normalizeArgs(subtitleOrOpts, maybeOpts)
    return toast.info(renderContent("info", msg, subtitle), getOptions(opts))
  }
}