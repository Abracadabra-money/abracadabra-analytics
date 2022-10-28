import { SelectListItem } from "components/Select";

export enum Networks {
    UNKNOW = 0,
    MAINNET = 1,
    BINANCE = 56,
    FANTOM = 250,
    AVALANCHE = 43114,
    ARBITRUM = 42161,
}

export const defaultNetworkList: SelectListItem[] = [
    { value: Networks.MAINNET, name: "Ethereum" },
    { value: Networks.BINANCE, name: "Binance" },
    { value: Networks.FANTOM, name: "Fantom" },
    { value: Networks.AVALANCHE, name: "Avalanche" },
    { value: Networks.ARBITRUM, name: "Arbitrum" },
];

const explores = {
    [Networks.UNKNOW]: "",
    [Networks.MAINNET]: "https://etherscan.io",
    [Networks.BINANCE]: "https://bscscan.com",
    [Networks.FANTOM]: "https://ftmscan.com",
    [Networks.AVALANCHE]: "https://snowtrace.io",
    [Networks.ARBITRUM]: "https://arbiscan.io",
};

export const getTransactionLink = (txHash: string, network: Networks) => `${explores[network]}/tx/${txHash}`;
export const getAddressLink = (address: string, network: Networks) => `${explores[network]}/address/${address}`;

export const getNetworkName = (network: Networks) => defaultNetworkList.find(({ value }) => value === network)?.name;
