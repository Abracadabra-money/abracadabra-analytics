import { Networks } from "config/blockchain";
import { TVL } from "config/endpoints";
import { AssetType } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useNetworkState } from "state/network/hooks";

interface TvlRes {
    readonly tvl: number;
}

interface Tvl {
    readonly loading: boolean;
    readonly error: boolean;
    readonly tvl: number;
}

export interface TvlBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
}

export default function (): Tvl {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();

    const body: TvlBody = {};

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<TvlRes>(TVL, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error || !data.tvl) {
            return { loading: !error && !data, error: !!error, tvl: 0 };
        }

        return {
            loading: false,
            error: false,
            tvl: data.tvl,
        };
    }, [type, cauldron, network, data, error]);
}
