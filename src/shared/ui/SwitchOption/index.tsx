import { IonItem, IonLabel, IonToggle } from "@ionic/react"
import "./styles.scss"

interface IProps {
  label: string;
  isChecked: boolean;
  onChange: (e: CustomEvent) => void;
}

export const SwitchOption = ({label, isChecked, onChange}: IProps) => {
  return(
    <IonItem
      lines="none"
      detail={false}
      className="switch-option"
    >
      <IonLabel className="switch-option__label">
        {label}
      </IonLabel>

      <IonToggle
        slot="end"
        checked={isChecked}
        onIonChange={(e) => onChange(e)}
        aria-label={`${label}`}
        onClick={(e) => e.stopPropagation()}
      />
    </IonItem>
  )
}