import "./styles.scss"
import { usePhonePicker } from "./usePhonePicker"

interface IProps {
  label: string,
  onChange:(value: string) => void,
}

export const PhonePicker = ({ label, onChange }: IProps) => {
  const {
    codes,
    focusedIndex,
    handleFocus,
    handleBlur,
    handleOtpOnChange,
    handleOtpOnRef,
  } = usePhonePicker(6, onChange)
  return (
    <div className="phone_picker_custom flex flex-direction-column">
      <div className="phone_picker_custom-label">{label}</div>
      <div className="sms-code__row">
        <div className="sms-code__row-prefix">
          0 996
        </div>
        {codes.map((code, index) => (
          <div className="sms-code__input" key={index}>
            <div className={`input ${focusedIndex === index ? "input--focused" : ""}`}>
              <input
                className="input__field"
                type="tel"
                value={code}
                onChange={(event) => handleOtpOnChange(index, event)}
                maxLength={1}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                ref={(input) => { handleOtpOnRef(input, index); }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}