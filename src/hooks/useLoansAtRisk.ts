import { LIQUIDATIONS_LOANS_AT_RISK } from "config/endpoints";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { IPagination } from "config/interfaces/pagination.interface";
import { DEFAULT_PAGE_SIZE } from "config/table";
import { Networks } from "config/blockchain";
import { AssetType } from "config/types";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useNetworkState } from "state/network/hooks";

interface Loan {
    readonly id: string;
    readonly address: string;
    readonly pool: string;
    readonly ltv: number;
    readonly maxLtv: number;
    readonly value: number;
}

interface Res {
    readonly pagination: IPagination;
    readonly loans: Loan[];
}

interface LoansOpen extends Res {
    readonly loading: boolean;
    readonly error: boolean;
}

interface Body {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
    pagination: IPagination;
}

export default function (pageNumber: number): LoansOpen {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();

    const body: Body = { pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber } };

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<Res>(LIQUIDATIONS_LOANS_AT_RISK, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error || !Array.isArray(data.loans)) {
            return { loading: !error && !data, error: !!error, loans: [], pagination: body.pagination };
        }

        return {
            loading: false,
            error: false,
            ...data,
        };
    }, [data, error, pageNumber, type, cauldron, network]);
}
