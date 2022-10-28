import { SelectListItem } from "components/Select";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useCauldronState } from "state/cauldron/hooks";
import { defaultAssetTypeList } from "config/types";

export function useAssetState(): AppState["asset"] {
    return useSelector<AppState, AppState["asset"]>(state => state.asset);
}

export function useAssetTypeList(): SelectListItem[] {
    const { cauldron } = useCauldronState();
    return useMemo(() => {
        if (!cauldron) return defaultAssetTypeList;
        return defaultAssetTypeList.filter(({ value }) => value === cauldron.assetType);
    }, [cauldron]);
}
