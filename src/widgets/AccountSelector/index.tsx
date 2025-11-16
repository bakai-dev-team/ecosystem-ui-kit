import { ICON_TYPES } from "../../shared/assets/icons/types"
import  "./styles.scss"
import { Icon } from "../../shared/assets/icons/Icon"

export const AccountSelector = () => {
  return (
    <div className="account-selector mb-16">
      <div className="account-selector-left">
        <div className="account-selector-left">
          <div className="account-selector-left-icon">
            <img src={"flsdk"} alt="elcart" />
          </div>
          <div className="account-selector-left-account">
            <div className="account-selector-left-account-name">Visa Gold</div>
            <div className="account-selector-left-account-card">1205***7240</div>
          </div>
        </div>
      </div>
      <div className="account-selector-right">
        <div className="account-selector-right-amount">3 060 c</div>
        <Icon type={ICON_TYPES.uncollapsedArrow} />
      </div>
    </div>
  )
}