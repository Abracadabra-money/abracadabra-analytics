import { Networks } from "config/blockchain";
import { LOANS_OPEN } from "config/endpoints";
import { AssetType } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useNetworkState } from "state/network/hooks";

interface LoansOpenRes {
    readonly count: number;
}

interface LoansOpen {
    readonly loading: boolean;
    readonly error: boolean;
    readonly count: number;
}

interface LoansOpenBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
}

export default function (): LoansOpen {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();

    const body: LoansOpenBody = {};

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<LoansOpenRes>(LOANS_OPEN, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error || !data.count) {
            return { loading: !error && !data, error: !!error, count: 0 };
        }

        return {
            loading: false,
            error: false,
            count: data.count,
        };
    }, [data, error]);
}
