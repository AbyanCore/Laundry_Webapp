export function formatCurrencyIDR(value: number) {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
    });
    return formatter.format(value);
}
