import { IonInput } from "@ionic/react";
import "./styles.scss";
import { ICON_TYPES }  from "../../assets/icons/types";
import { Icon }  from "../../assets/icons/Icon";
export type ITextFieldTypes =
  | "date"
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url"
  | "time"
  | "week"
  | "month"
  | "datetime-local";

interface IProps {
  preIcon?: any;
  postIcon?: any;
  placeholder?: string;
  error?: string;
  type?: ITextFieldTypes;
  clearInput?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onPostIconClick?: () => void;
}

export const Input = ({
  preIcon,
  postIcon,
  placeholder,
  type = "text",
  value,
  clearInput,
  onChange,
  onPostIconClick,
  error,
}: IProps) => {
  return (
    <div className={`input ${error ? "input--error" : ""}`}>
      {preIcon && <Icon type={preIcon} className="input__icon" />}

      <IonInput
        mode="ios"
        placeholder={placeholder}
        className="input__field"
        type={type}
        clearInput={clearInput}
        value={value}
        debounce={0}
        onIonInput={(e) => onChange?.(e.detail.value!)}
      />

      {postIcon && (
        <Icon
          onClick={onPostIconClick}
          type={postIcon}
          className="input__post-icon"
        />
      )}

      {error && (
        <div className="input__error-wrapper">
          <Icon type={ICON_TYPES.info} className="input__error-icon" />
          <p className="input__error">{error}</p>
        </div>
      )}
    </div>
  );
};
