import { IonModal } from "@ionic/react";
import "./styles.scss";
import  { ReactNode } from "react";
import { Icon } from "../../assets/icons/Icon";


type TProps = {
  isOpen: boolean;
  onClose: () => void;
  initialBreakpoint?: number;
  label?: string;
  actionIcon?:any;
  actionText?:string;
  text?: string;
  children: ReactNode;
  onActionClick?: () => void;
};

export const Modal = ({
  isOpen,
  onClose,
  initialBreakpoint = 0.5,
  children,
  label,
  text,
  actionIcon,
  actionText,
  onActionClick
}: TProps) => {
  return (
    <IonModal
      isOpen={isOpen}   
      onDidDismiss={onClose}
      className="account-modal"
      breakpoints={[0, 0.5, 0.9]}
      initialBreakpoint={initialBreakpoint}
    >
      <div className="modal-content">
        <div className="modal-content-header">
          <div className="modal-content-header-block">
            <div className="modal-content-header-label">{label}</div>
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
