
import { HTMLAttributes } from "react"
export type TBtnVariant = "primary" | "secondary" | "monochrome" | "solid"
export type TBtnSize = "sm" | "md" | "lg"
export interface IProps extends HTMLAttributes<HTMLIonButtonElement> {
  disabled?: boolean
  variant?: TBtnVariant
  size?: TBtnSize
}