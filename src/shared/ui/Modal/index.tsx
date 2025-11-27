import { IonModal } from "@ionic/react";
import "./styles.scss";
import {ReactNode} from "react";
import { Icon } from "../../assets/icons/Icon";


type TProps = {
  isOpen: boolean;
  onClose: () => void;
  label?: string;
  actionIcon?:any;
  actionText?:string;
  text?: string;
  children: ReactNode;
  onActionClick?: () => void;
  className?:string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  label,
  text,
  actionIcon,
  actionText,
  onActionClick,
  className
}: TProps) => {
  return (
    <IonModal
        isOpen={isOpen}
        onDidDismiss={onClose}
        className={`fixed-modal ${className}`}
        backdropDismiss={true}
        trigger="open-custom-dialog"
    >
      <div className="modal-content">
        <div className="modal-content-header">
          <div className="modal-content-header-block">
            {label && <div className="modal-content-header-label">{label}</div>}
            <div onClick={onActionClick} className="modal-content-header-right-label">
               {actionIcon && <Icon type={actionIcon} className="icon"/> }
               {actionText && <span>{actionText}</span>}
            </div>
          </div>
          {text && <div className="modal-content-header-text">{text}</div>}
        </div>

        {children}
      </div>
    </IonModal>
  );
};
