import { Networks } from "config/blockchain";
import { LOANS_SIZE } from "config/endpoints";
import { AssetType } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useNetworkState } from "state/network/hooks";

interface LoansSizeRes {
    readonly amount: number;
}

interface LoansSizeOpen {
    readonly loading: boolean;
    readonly error: boolean;
    readonly amount: number;
}

interface LoansSizeOpenBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
}

export default function (): LoansSizeOpen {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();

    const body: LoansSizeOpenBody = {};

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<LoansSizeRes>(LOANS_SIZE, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error || !data.amount) {
            return { loading: !error && !data, error: !!error, amount: 0 };
        }

        return {
            loading: false,
            error: false,
            amount: data.amount,
        };
    }, [data, error]);
}
