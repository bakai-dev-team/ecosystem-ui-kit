import Lottie from "lottie-react"
import success from "@/shared/assets/animations/executed.json"
import in_progress from "@/shared/assets/animations/process.json"
import confirm_payment from "@/shared/assets/animations/draft.json"
import error from "@/shared/assets/animations/rejected.json"

export type TAnimatedStatusImgType = "success" | "error" | "in_progress" | "confirm_payment"
interface IProps {
    status: TAnimatedStatusImgType
    loop?: boolean
}

const statusMap = {
    success,
    error,
    in_progress,
    confirm_payment,
} as const

export const AnimatedStatusImg = ({ status, loop = false }: IProps) => (
    <Lottie className="animated_status" animationData={statusMap[status]} loop={loop} />
)