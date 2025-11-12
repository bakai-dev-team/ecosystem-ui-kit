import { Icon } from "@/shared/assets/icons/Icon"
import { usePaymentAction } from "./model/usePaymentAction"
import "./styles.scss"

export type TPaymentActionType = "autopayment" | "templates" | "retry"

interface IProps {
  type: TPaymentActionType
  onPaymentActionClick?: () => void
}

export const PaymentAction = ({ type, onPaymentActionClick }: IProps) => {
  const { getPaymentActionData } = usePaymentAction(type)
  return <div
    onClick={onPaymentActionClick}
    className="payment-action"
  >
    <div className="payment-action__arrow">
      <Icon className="payment-action__arrow-icon" type={getPaymentActionData().icon} />
    </div>
    <span>{getPaymentActionData().label}</span>
  </div>
}