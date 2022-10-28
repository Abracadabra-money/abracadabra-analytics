import { Networks } from "config/blockchain";
import { AssetType } from "config/types";

export interface ICauldron {
    readonly id: string;
    readonly name: string;
    readonly address: string;
    readonly network: Networks;
    readonly assetType: AssetType;
    readonly liquidationFee: number;
    readonly borrowFee: number;
    readonly interest: number;
    readonly totalBorrowed: number;
    readonly totalCollaterel: number;
}
