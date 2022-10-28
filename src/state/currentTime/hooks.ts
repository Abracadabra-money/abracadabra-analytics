import useInterval from "hooks/useInterval";
import useIsWindowVisible from "hooks/useIsWindowVisible";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "state";
import { setTime } from "./actions";

export function useCurrentTimeState(): AppState["currentTime"] {
    return useSelector<AppState, AppState["currentTime"]>(state => state.currentTime);
}

export const usePollTime = (refreshTime = 600000) => {
    const dispatch = useAppDispatch();
    const isWindowVisible = useIsWindowVisible();

    useInterval(
        () => {
            dispatch(setTime({ time: Date.now() }));
        },
        isWindowVisible ? refreshTime : null,
        true,
    );
};
