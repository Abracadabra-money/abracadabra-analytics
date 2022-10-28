import { SelectListItem } from "components/Select";
import { defaultNetworkList, Networks } from "config/blockchain";
import { MIM_BORROWED } from "config/endpoints";
import { AssetType, defaultAssetTypeList } from "config/types";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";
import { useAssetState } from "state/asset/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useCauldronsState } from "state/cauldrons/hooks";
import { ICauldron } from "state/cauldrons/types";
import { useNetworkState } from "state/network/hooks";

interface MimBorrowedRes {
    readonly totalBorrow: number;
    readonly network?: Networks;
    readonly assetType?: AssetType;
    readonly pool?: string;
}

export interface MimBorrowedItem {
    readonly totalBorrow: number;
    readonly network?: SelectListItem;
    readonly assetType?: SelectListItem;
    readonly pool?: ICauldron;
}

export interface MimBorrowed {
    readonly loading: boolean;
    readonly error: boolean;
    readonly changes: MimBorrowedItem[];
}

interface MimBorrowedBody {
    cauldronId?: string;
    network?: Networks;
    assetType?: AssetType;
    group?: "cauldron" | "asset" | "network";
}

export default function (group: MimBorrowedBody["group"]): MimBorrowed {
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { network } = useNetworkState();
    const { cauldrons } = useCauldronsState();

    const body: MimBorrowedBody = { group };

    if (type !== AssetType.UNKNOW) {
        body.assetType = type;
    }

    if (network !== Networks.UNKNOW) {
        body.network = network;
    }

    if (cauldron) {
        body.cauldronId = cauldron.id;
    }

    const { data, error } = useAxios<MimBorrowedRes[]>(MIM_BORROWED, { method: "POST", data: body });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error, changes: [] };
        }
        const changes = data.map(({ totalBorrow, network, assetType, pool }) => {
            let _network: SelectListItem | undefined;
            if (network) {
                _network = defaultNetworkList.find(n => n.value === Number(network));
            }
            let _assettype: SelectListItem | undefined;
            if (assetType) {
                _assettype = defaultAssetTypeList.find(n => n.value === Number(assetType));
            }
            let _pool: ICauldron | undefined;
            if (pool) {
                _pool = cauldrons.find(n => n.id === pool);
            }
            return {
                totalBorrow: totalBorrow,
                network: _network,
                assetType: _assettype,
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
