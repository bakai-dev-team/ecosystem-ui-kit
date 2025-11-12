export class MoneyHelper {
  static toHumanizedSum(som: number): string {
    if (som === 0) return "0"
    if (!som) return ""
    return Math.floor(som).toLocaleString("ru-RU").replace(/,/g, " ")
  }
}


export const validateAmount = (
  value: string,
  parkBalance: number
): { isValid: boolean; normalized: string } => {
  const cleanedValue = value.replace(/[^0-9.,]/g, "")
  const normalized = cleanedValue.replace(",", ".")
  const regex = /^\d*([.]\d{0,2})?$/
  const num = parseFloat(normalized)

  const isValid =
    regex.test(normalized) &&
    !isNaN(num) &&
    num > 0 &&
    num <= parkBalance

  return { isValid, normalized }
}