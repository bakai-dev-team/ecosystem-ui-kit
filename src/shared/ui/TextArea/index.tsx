import "./styles.scss"

interface IProps extends React.HTMLProps<HTMLTextAreaElement> {
  canShowAmount?: boolean
  maxLength?: number
  onChangeValue?: (value: string) => void
}

export const TextArea = ({ canShowAmount = true, maxLength = 200, ...rest }: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    rest.onChangeValue?.(e.target.value)
  }
  return (
    <div className="textarea">
      <textarea
        id="242342"
        className="textarea-input"
        {...rest}
        value={rest.value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {canShowAmount && (
        <div className="textarea-amount">
          {String(rest.value).length}/{maxLength}
        </div>
      )}
    </div>
  )
}