import { SelectListItem } from "components/Select";
import { Networks } from "config/blockchain";
import { LIQUIDATIONS_TOTAL_VALUE_CHANGES } from "config/endpoints";
import { AssetType } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { ICauldron } from "state/cauldrons/types";
import { useNetworkState } from "state/network/hooks";
import { defaultNetworkList } from "config/blockchain";
import { defaultAssetTypeList } from "config/types";
import { useCauldronsState } from "state/cauldrons/hooks";

export interface Res {
    readonly week: string;
    readonly amount: number;
    readonly network?: Networks;
    readonly assettype?: AssetType;
    readonly pool?: string;
}

export interface ResultItem {
    readonly week: Date;
    readonly amount: number;
    readonly network?: SelectListItem;
    readonly assettype?: SelectListItem;
    readonly pool?: ICauldron;
}

export interface Result {
    readonly loading: boolean;
    readonly error: boolean;
    readonly changes: ResultItem[];
}

export interface Body {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
    group?: "cauldron" | "asset" | "network";
}

export default function (group?: Body["group"]): Result {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();
    const { cauldrons } = useCauldronsState();

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

    if (group) {
        body.group = group;
    }

    const { data, error } = useAxios<Res[]>(LIQUIDATIONS_TOTAL_VALUE_CHANGES, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error, changes: [] };
        }
        const changes = data.map(({ week, amount, network, assettype, pool }) => {
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
                week: new Date(week),
                amount,
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
