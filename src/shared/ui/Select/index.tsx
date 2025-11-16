import "./styles.scss";
import { Icon } from "../../../shared/assets/icons/Icon";
import { IonInput } from "@ionic/react";

interface SelectProps {
    label?: string;
    value?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const Select = ({
                           label,
                           value = "",
                           onClick,
                           disabled,
                       }: SelectProps) => {
    return (
        <div className={`select ${disabled ? "disabled" : ""}`}>
            <div
                className="select__display"
                onClick={!disabled ? onClick : undefined}
                role="button"
                tabIndex={0}
            >
                <IonInput
                    className="select__input"
                    value={value}
                    label={label}
                    labelPlacement="floating"
                    fill="solid"
                    readonly={true}
                />
                <Icon className={"select__icon"} type={"arrowRight"} />
            </div>
        </div>
    );
};
