import { SelectListItem } from "components/Select";

export enum LoanStatus {
    UNKNOW,
    NOT_LIQUIDATED,
    LIQUIDATED,
}

export enum NewLoanOpened {
    UNKNOW,
    PRE_EXISTING_LOAN,
    NEW_LOAN,
}

export enum LoanOpenStatus {
    UNKNOW,
    CLOSE,
    OPEN,
}

export enum LiquidationStatus {
    UNKNOW,
    PARTIAL,
    FULL,
}

export enum AssetType {
    UNKNOW,
    STABLE,
    NON_STABLE,
}

export const defaultAssetTypeList: SelectListItem[] = [
    { value: AssetType.STABLE, name: "Stable" },
    { value: AssetType.NON_STABLE, name: "Non-Stable" },
];
