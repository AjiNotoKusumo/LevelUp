const currencyFormatter = (value: number | string) => {
    return Number(value).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0, currencyDisplay: "code"})
}

export default currencyFormatter