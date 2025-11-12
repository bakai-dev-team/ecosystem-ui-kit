import elcart from "../../assets/icons/elcart.svg"
import visa from "../../assets/icons/visa_gold.svg"
import credit417 from "../../assets/icons/wallet.svg"

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