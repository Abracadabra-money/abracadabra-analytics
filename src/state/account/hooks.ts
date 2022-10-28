import { useSelector } from "react-redux";
import { AppState } from "state";

export function useAccountState(): AppState["account"] {
    return useSelector<AppState, AppState["account"]>(state => state.account);
}
