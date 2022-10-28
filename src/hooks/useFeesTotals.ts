import { Networks } from "config/blockchain";
import { STATISTIC_FEES } from "config/endpoints";
import { AssetType } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useNetworkState } from "state/network/hooks";

interface FeesTotalsRes {
    readonly totalfees: string;
    readonly borrowfees: string;
    readonly interestfees: string;
    readonly liquidationfee: string;
}

interface FeesTotals {
    readonly loading: boolean;
    readonly error: boolean;
    readonly totalfees?: number;
    readonly borrowfees?: number;
    readonly interestfees?: number;
    readonly liquidationfee?: number;
}

interface FeesTotalsBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
}

export default function (): FeesTotals {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();

    const body: FeesTotalsBody = {};

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<FeesTotalsRes>(STATISTIC_FEES, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error };
        }
        const { totalfees, borrowfees, interestfees, liquidationfee } = data;
        return {
            loading: false,
            error: false,
            totalfees: parseFloat(totalfees),
            borrowfees: parseFloat(borrowfees),
            interestfees: parseFloat(interestfees),
            liquidationfee: parseFloat(liquidationfee),
        };
    }, [type, cauldron, network, data, error]);
}
