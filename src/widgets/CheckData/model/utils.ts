const keyMap: Record<string, string> = {
    summa: "summa",
    postavshik: "postavshik",
    receiver: "receiver",
    requisite: "requisite",
    execution_date: "execution_date",
    check_date: "check_date",
    bill_account: "bill_account",
    operation_type: "operation_type",
    check_number: "check_number",
    reason:"reason",
}

export const formatizeKeyToTranslation = (key: string): string => keyMap[key] ?? ""

export const formatizeObjectToArray = (data: Record<string, any>) =>
    Object.entries(data).map(([key, value]) => ({
        label: formatizeKeyToTranslation(key),
        value,
    }))