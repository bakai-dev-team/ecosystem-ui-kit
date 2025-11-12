import { Icon } from "@/shared/assets/icons/Icon"
import "./styles.scss"
import { useTranslation } from "react-i18next"
import { ICON_TYPES } from "@/shared/assets/icons/types"

export const Gift = ({onClose}:{onClose: () => void}) => {
    const { t } = useTranslation()
    return (
        <div className="gift-container">
            <div  className="gift-close-icon" onClick={onClose}>
                <Icon  className="financial-profile__arrow-icon" type={ICON_TYPES.cross} />
            </div>
            <div className="gift-container-text">
                <h2>{t("widgets.gift.title")}</h2>
                <p>{t("widgets.gift.description")}</p>
                <button>{t("widgets.gift.inviteButton")}</button>
            </div>
            <div  className="gift-container-image">
                <img src={"GiftImage"} alt="image" />

            </div>
        </div>
    )
}