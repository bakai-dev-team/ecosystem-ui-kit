import { useTranslation } from "react-i18next"
import { TPaymentActionType } from "../index"
import { ICON_TYPES } from "@/shared/assets/icons/types"

export const usePaymentAction = (type: TPaymentActionType) => {
  const { t } = useTranslation()
  const getPaymentActionData = () => {
    if (type === "autopayment") {
      return {
        label: t("templates"),
        icon: ICON_TYPES.infinite,
      }
    } else if (type === "retry") {
      return {
        label: t("retry"),
        icon: ICON_TYPES.retry_v2,
      }
    } else {
      return {
        label: t("autopayment"),
        icon: ICON_TYPES.plus,
      }
    }
  }
  return { getPaymentActionData }
}