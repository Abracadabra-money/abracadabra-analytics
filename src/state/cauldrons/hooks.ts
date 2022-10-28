import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useAssetState } from "../asset/hooks";
import { useNetworkState } from "../network/hooks";
import { ICauldron } from "./types";
import { AssetType } from "config/types";
import { Networks } from "config/blockchain";
import { SelectListItem } from "components/Select";

export function useCauldronsState(): AppState["cauldrons"] {
    return useSelector<AppState, AppState["cauldrons"]>(state => state.cauldrons);
}

export function useAllCaldrons(): ICauldron[] {
    const { network } = useNetworkState();
    const { type } = useAssetState();
    const { cauldrons } = useCauldronsState();

    return useMemo(
        () =>
            cauldrons.filter(cauldron => {
                if (network !== Networks.UNKNOW || type !== AssetType.UNKNOW) {
                    if (network !== Networks.UNKNOW && type === AssetType.UNKNOW) {
                        return cauldron.network === network;
                    }
                    if (network === Networks.UNKNOW && type !== AssetType.UNKNOW) {
                        return cauldron.assetType === type;
                    }
                    if (network !== Networks.UNKNOW && type !== AssetType.UNKNOW) {
                        return cauldron.network === network && cauldron.assetType === type;
                    }
                }
                return true;
            }),
        [network, type, cauldrons],
    );
}

export function useCauldronList(): SelectListItem[] {
    const list = useAllCaldrons();
    return useMemo(() => list.map(({ name, id }) => ({ name, value: id })), [list]);
}
