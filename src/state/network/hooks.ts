import { SelectListItem } from "components/Select";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "state";
import { useCauldronState } from "../cauldron/hooks";
import { defaultNetworkList } from "config/blockchain";

export function useNetworkState(): AppState["network"] {
    return useSelector<AppState, AppState["network"]>(state => state.network);
}

export function useNetworkList(): SelectListItem[] {
    const { cauldron } = useCauldronState();
    return useMemo(() => {
        if (!cauldron) return defaultNetworkList;
        return defaultNetworkList.filter(({ value }) => value === cauldron.network);
    }, [cauldron]);
}
