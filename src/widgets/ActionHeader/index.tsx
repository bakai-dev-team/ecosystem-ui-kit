import { Icon } from "@/shared/assets/icons/Icon";
import "./styles.scss"
import { IonLabel } from "@ionic/react"
import { ICON_TYPES } from "@/shared/assets/icons/types";

interface IProps {
  additionalIcon?: React.ReactElement,
  customIcon?: string;
  onBack?: () => void
  label?: string
}

export const ActionHeader = ({ label, onBack }: IProps) => {
  return (
    <div className="action-header">
      <div className="action-header__icon">
        <Icon
          className="back-icon"
          type={ICON_TYPES.arrowLeft}
          onClick={onBack}
        />
      </div>
      <IonLabel className="action-header__label">{label}</IonLabel>
      <div></div>
    </div>
  )
}