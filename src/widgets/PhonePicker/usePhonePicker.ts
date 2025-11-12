import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export const usePhonePicker = (inputCount: number, onChange:(value: string)=>void) => {
  const { t } = useTranslation()
  const initialCodes = Array(inputCount).fill("")
  const [codes, setCodes] = useState<string[]>(initialCodes)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const checkCodeComplete = codes.every((code) => code !== "")
  const handleOtpOnChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (!isNaN(Number(value))) {
      const newCodes = [...codes]
      newCodes[index] = value
      setCodes(newCodes)
      onChange(newCodes.join(''))
      if (value !== "" && index < inputCount - 1) {
        inputRefs.current[index + 1]?.focus()
      } else if (value === "" && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }
  const handlePaste = (event: any) => {
    event.preventDefault()
    const clipboardData = event.clipboardData
    const pastedData = clipboardData.getData("text")
    const newCodes = pastedData.split("").filter((char: string) => !isNaN(Number(char)))
    if (newCodes.length <= codes.length) {
      const updatedCodes = [...newCodes, ...Array(codes.length - newCodes.length).fill("")]
      setCodes(updatedCodes)
      inputRefs.current[newCodes.length - 1]?.focus()
    } else {
      setCodes(newCodes.slice(0, codes.length))
      inputRefs.current[codes.length - 1]?.focus()
    }
  }

  const handleOtpOnRef = (input: HTMLInputElement | null, index: number) =>
    (inputRefs.current[index] = input as HTMLInputElement)

  const clearForm = () => {
    setCodes(initialCodes)
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }
  const handleBlur = () => {
    setFocusedIndex(null)
  }
  useEffect(() => {
    return () => {
      clearForm()
    }
  }, [])

  return {
    focusedIndex,
    codes,
    checkCodeComplete,
    t,
    handleOtpOnChange,
    handleOtpOnRef,
    handlePaste,
    handleBlur,
    handleFocus,
  }
}