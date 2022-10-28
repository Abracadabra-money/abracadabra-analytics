import { SelectListItem } from "components/Select";
import { defaultNetworkList, Networks } from "config/blockchain";
import { STATISTIC_FEES } from "config/endpoints";
import { AssetType, defaultAssetTypeList } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useCauldronsState } from "state/cauldrons/hooks";
import { ICauldron } from "state/cauldrons/types";
import { useNetworkState } from "state/network/hooks";

interface FeesTotalsRes {
    readonly totalfees: string;
    readonly borrowfees: string;
    readonly interestfees: string;
    readonly liquidationfee: string;
    readonly network?: Networks;
    readonly assettype?: AssetType;
    readonly pool?: string;
}

export interface FeesTotalsItem {
    readonly totalfees: number;
    readonly network?: SelectListItem;
    readonly assettype?: SelectListItem;
    readonly pool?: ICauldron;
}

export interface FeesTotals {
    readonly loading: boolean;
    readonly error: boolean;
    readonly changes: FeesTotalsItem[];
}

interface FeesTotalsBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
    group?: "cauldron" | "asset" | "network";
}

export default function (group: FeesTotalsBody["group"]): FeesTotals {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();
    const { cauldrons } = useCauldronsState();

    const body: FeesTotalsBody = { group };

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<FeesTotalsRes[]>(STATISTIC_FEES, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error, changes: [] };
        }
        const changes = data.map(({ totalfees, borrowfees, interestfees, liquidationfee, network, assettype, pool }) => {
            let _network: SelectListItem | undefined;
            if (network) {
                _network = defaultNetworkList.find(n => n.value === Number(network));
            }
            let _assettype: SelectListItem | undefined;
            if (assettype) {
                _assettype = defaultAssetTypeList.find(n => n.value === Number(assettype));
            }
            let _pool: ICauldron | undefined;
            if (pool) {
                _pool = cauldrons.find(n => n.id === pool);
            }
            return {
                totalfees: parseFloat(totalfees),
                borrowfees: parseFloat(borrowfees ?? "0"),
                interestfees: parseFloat(interestfees ?? "0"),
                liquidationfee: parseFloat(liquidationfee ?? "0"),
                network: _network,
                assettype: _assettype,
                pool: _pool,
            };
        });
        return {
            loading: false,
            error: false,
            changes,
        };
    }, [type, cauldron, network, data, error]);
}
