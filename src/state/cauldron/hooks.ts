import { useSelector } from "react-redux";
import { AppState } from "state";

export function useCauldronState(): AppState["cauldron"] {
    return useSelector<AppState, AppState["cauldron"]>(state => state.cauldron);
}
