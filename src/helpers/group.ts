import moment from "moment";
import { FeesChangesItem } from "hooks/useFeesChanges";
import { FeesTotalsItem } from "hooks/useFeesTotalsGroup";
import { MimBorrowedItem } from "hooks/useMimBorrowed";
import { CollateredItem } from "hooks/useCollateraled";

export const groupByNetworks = (changes: FeesChangesItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    const result: any = {};

    for (const { week } of changes) {
        const name = moment(week).format("D.MM.YY");
        if (result[name]) continue;

        const _changes = changes.filter(data => week.getTime() === data.week.getTime());
        const values: any = {};
        for (const { network, totalfees } of _changes) {
            values[network?.name ?? ""] = totalfees;
        }
        result[name] = { ...values, name };
    }

    return Object.values(result);
};

export const groupByAsset = (changes: FeesChangesItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    const result: any = {};

    for (const { week } of changes) {
        const name = moment(week).format("D.MM.YY");
        if (result[name]) continue;

        const _changes = changes.filter(data => week.getTime() === data.week.getTime());
        const values: any = {};
        for (const { assettype, totalfees } of _changes) {
            values[assettype?.name ?? ""] = totalfees;
        }
        result[name] = { ...values, name };
    }

    return Object.values(result);
};

export const groupByCauldron = (changes: FeesChangesItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    const result: any = {};

    for (const { week } of changes) {
        const name = moment(week).format("D.MM.YY");
        if (result[name]) continue;

        const _changes = changes.filter(data => week.getTime() === data.week.getTime());
        const values: any = {};
        for (const { pool, totalfees } of _changes) {
            values[pool?.name ?? ""] = totalfees;
        }
        result[name] = { ...values, name };
    }

    return Object.values(result);
};

export const groupByNetworksTotals = (changes: FeesTotalsItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ network, totalfees }) => ({ name: network?.name ?? "", value: totalfees }));
};

export const groupByAssetTotals = (changes: FeesTotalsItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ assettype, totalfees }) => ({ name: assettype?.name ?? "", value: totalfees }));
};

export const groupByCauldronTotals = (changes: FeesTotalsItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ pool, totalfees }) => ({ name: pool?.name ?? "", value: totalfees }));
};

export const groupByCauldronBorrowed = (changes: MimBorrowedItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ pool, totalBorrow }) => ({ name: pool?.name ?? "", value: totalBorrow }));
};

export const groupByNetworkBorrowed = (changes: MimBorrowedItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ network, totalBorrow }) => ({ name: network?.name ?? "", value: totalBorrow }));
};

export const groupByAssetBorrowed = (changes: MimBorrowedItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ assetType, totalBorrow }) => ({ name: assetType?.name ?? "", value: totalBorrow }));
};

export const groupByCauldronCollatered = (changes: CollateredItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ pool, totalCollateral }) => ({ name: pool?.name ?? "", value: totalCollateral }));
};

export const groupByNetworkCollatered = (changes: CollateredItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ network, totalCollateral }) => ({ name: network?.name ?? "", value: totalCollateral }));
};

export const groupByAssetCollatered = (changes: CollateredItem[] = []) => {
    if (!Array.isArray(changes)) return [];
    return changes.map(({ assetType, totalCollateral }) => ({ name: assetType?.name ?? "", value: totalCollateral }));
};
