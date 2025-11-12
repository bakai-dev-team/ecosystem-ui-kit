import { IonButton } from "@ionic/react"
import { IProps } from "./types"
import { FC } from "react"
import "./styles.scss"

export const Button: FC<IProps> =
  (
    {
      disabled,
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    }) => {
    const variantClass = `btn-${variant}`
    const sizeClass = `btn-${size}`
    const combinedClassName = `btn ${variantClass} ${sizeClass} ${className}`.trim()
    return (
      <IonButton  disabled={disabled} className={combinedClassName} {...rest}>
        {children}
      </IonButton>
    )
  }
