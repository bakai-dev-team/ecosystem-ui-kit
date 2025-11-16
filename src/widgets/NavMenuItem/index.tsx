
import "./styles.scss"
import BakaiLogo from "../../shared/assets/svg-icons/bakai-logo.svg"
import { Icon } from "../../shared/assets/icons/Icon";

interface Props {
    icon: any;
    title?: string;
    rightIcon: any;
    bakai_logo?: boolean;
    onBack?: () => void;
    onClick?: () => void;
}

export const NavMenuItem = ({ icon, title, rightIcon,bakai_logo = false,onBack,onClick }: Props) => {
    return (
        <div className="navigation-list">
                <div  onClick={onBack} className="navigation-list__icon">
                    <Icon type={icon} className="navigation-list__icons"></Icon>
                </div>
                {title &&
                    <div className="navigation-list__title">
                        <p>{title}</p>
                    </div>
                }
                {bakai_logo &&
                    <div className={"navigation-list__bakai-logo"}>
                       <img src={BakaiLogo} alt={"BakaiLogo"}/>
                    </div>
                }


            <div onClick={onClick} className={"navigation-list__right-icon"}>
                <Icon type={rightIcon} className="navigation-list__icons"></Icon>
            </div>
        </div>
    )
}