import { Networks } from "config/blockchain";
import { LIQUIDATIONS_TOTAL_NUMBER } from "config/endpoints";
import { AssetType } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useNetworkState } from "state/network/hooks";

interface Res {
    readonly count: number;
}

interface Result {
    readonly loading: boolean;
    readonly error: boolean;
    readonly count: number;
}

interface Body {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
}

export default function (): Result {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();

    const body: Body = {};

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<Res>(LIQUIDATIONS_TOTAL_NUMBER, { method: "POST", data: body });

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
