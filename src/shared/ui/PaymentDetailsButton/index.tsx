import "./styles.scss";
import { Icon } from "../../assets/icons/Icon";
import { ICON_TYPES } from "../../assets/icons/types";

interface IProps {
  label: string;
  onClick?:() => void;
}

export const PaymentDetailsButton = ({ label, onClick }: IProps) => {
  return (
    <div className="payment-details-button" onClick={onClick}>
      <div className="payment-details-button__label">{label}</div>
      <Icon className="payment-details-button__icon" type={ICON_TYPES.arrowRight} />
    </div>
  );
};
