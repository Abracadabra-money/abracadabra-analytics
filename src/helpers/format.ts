const formatUSD = (value?: number) => {
    if (typeof value !== "number" || value === 0) return "$ 0.0";

    let decimals = value < 1 ? 4 : 2;

    if (value < 0.0001) decimals = 6;

    const formatAmount = Number(value.toFixed(decimals));

    if (value < 0.0001) return `$ ${formatAmount}`;

    return `$ ${formatAmount.toLocaleString("en-US", { currency: "USD" })}`;
};

const formatPercent = (value?: number) => {
    if (typeof value !== "number" || value === 0 || value < 0.0001) return "0.0%";
    const decimals = value < 1 ? 4 : 2;

    const formatAmount = value.toFixed(decimals);

    return `${formatAmount}%`;
};

const formatLargeSum = (value?: number) => {
    if (typeof value !== "number" || value < 1) return "0";

    const lookup = [
        { value: 0, symbol: "" },
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "Q" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.reverse().find(item => value >= item.value);
    //@ts-ignore
    return `${(value / item.value).toFixed(2).replace(rx, "$1")}${item.symbol}`;
};

export const format = (type: "currency" | "percent" | "number", value = 0) => {
    return type === "currency" ? formatUSD(value) : type === "percent" ? formatPercent(value) : formatLargeSum(value);
};

export const formatToFixed = (fixed: number, value?: string | number) => {
    if (isNaN(Number(value)) || !value) return "0";

    const itsNumber = typeof value === "number";
    const maxFixedValue = !itsNumber ? parseFloat(value).toFixed(20) : value;
    //eslint-disable-next-line no-useless-escape
    let re = new RegExp(`^-?\\d+(?:\.\\d{0,` + (fixed || -1) + `})?`);
    //@ts-ignore
    const parsedValue = maxFixedValue.match(re)[0];

    if (+parsedValue === 0) return "0";

    if (Number.isInteger(+parsedValue)) return parseFloat(parsedValue).toFixed(1);

    const removedZero = parsedValue.replace(/0*$/, "");
    const removedDot = removedZero.endsWith(".") ? removedZero.slice(0, -1) : removedZero;
    return removedDot;
};
