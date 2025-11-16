import elcart from "../../assets/svg-icons/elcart.svg"
import visa from "../../assets/svg-icons/visa_gold.svg"
import credit417 from "../../assets/svg-icons/wallet.svg"

export const getIcon = (accountImageName: string): string => {
  switch (accountImageName) {
    case "DEPOSITE":
    case "CONSUMER_CREDIT":
    case "Visa.svg":
    case "EXTERNAL_VISA":
      return visa
    case "ELCART":
    case "Элкарт":
    case "EXTERNAL_ELCART":
      return elcart
    case "CREDIT":
    default:
      return credit417
  }
}