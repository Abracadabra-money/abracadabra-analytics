import { SelectListItem } from "components/Select";
import { Networks } from "config/blockchain";
import { STATISTIC_FEES_CHANGES } from "config/endpoints";
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

export interface FeesChangesRes {
    readonly week: string;
    readonly totalfees: string;
    readonly borrowfees?: string;
    readonly interestfees?: string;
    readonly liquidationfee?: string;
    readonly network?: Networks;
    readonly assettype?: AssetType;
    readonly pool?: string;
}

export interface FeesChangesItem {
    readonly week: Date;
    readonly totalfees: number;
    readonly borrowfees: number;
    readonly interestfees: number;
    readonly liquidationfee: number;
    readonly network?: SelectListItem;
    readonly assettype?: SelectListItem;
    readonly pool?: ICauldron;
}

export interface FeesChanges {
    readonly loading: boolean;
    readonly error: boolean;
    readonly changes: FeesChangesItem[];
}

export interface FeesChangesBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
    group?: "cauldron" | "asset" | "network";
}

export default function (group?: FeesChangesBody["group"]): FeesChanges {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();
    const { cauldrons } = useCauldronsState();

    const body: FeesChangesBody = {};

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

    const { data, error } = useAxios<FeesChangesRes[]>(STATISTIC_FEES_CHANGES, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error, changes: [] };
        }
        const changes = data.map(({ week, totalfees, borrowfees, interestfees, liquidationfee, network, assettype, pool }) => {
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
