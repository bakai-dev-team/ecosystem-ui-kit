export const numberWithSpaces = (x: string | number | null | undefined): string => {
    const parts = x?.toString()?.split(".") || [];

    if (parts[0]) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return parts.join(".");
}