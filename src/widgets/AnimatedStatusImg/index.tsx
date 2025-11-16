import Lottie from "lottie-react";
import { animations } from "../../shared/assets/animations";
import "./styles.scss";
const { success, in_progress, confirm_payment, error } = animations;

export type TAnimatedStatusImgType =
  | "success"
  | "error"
  | "in_progress"
  | "confirm_payment";
export type TAnimatedStatusSize = "sm" | "md" | "lg";
interface IProps {
  status: TAnimatedStatusImgType;
  loop?: boolean;
  size?: TAnimatedStatusSize;
}

const statusMap = {
  success,
  error,
  in_progress,
  confirm_payment,
} as const;

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
} as const;

export const AnimatedStatusImg = ({
  status,
  loop = false,
  size = "md",
}: IProps) => (
  <Lottie
    className="animated_status"
    animationData={statusMap[status]}
    loop={loop}
    style={{
      width: sizeMap[size],
      height: sizeMap[size],
    }}
  />
);
