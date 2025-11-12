import { IonToggle } from "@ionic/react";
import clsx from "clsx";
import "./styles.scss";

interface IProps {
  checked?: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
  onChange?: (event: CustomEvent) => void;
}

export const Toggle = (props: IProps) => {
  const { checked, text, size = "md", onChange } = props;

  return (
    <div className={clsx("toggle", `toggle--${size}`)}>
      {text && <p>{text}</p>}
      <IonToggle
        aria-label="Primary toggle"
        checked={checked}
        onIonChange={onChange}
      />
    </div>
  );
};
