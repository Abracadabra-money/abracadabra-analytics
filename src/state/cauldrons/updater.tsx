import { CAULDRONS_LIST } from "config/endpoints";
import axios from "axios";
import { useAppDispatch } from "state";
import { updateCauldrons } from "./actions";
import { useEffect } from "react";
import { useCurrentTimeState } from "../currentTime/hooks";

export default function Updater(): null {
    const dispatch = useAppDispatch();
    const { time } = useCurrentTimeState();

    const load = async () => {
        const { data } = await axios.get(CAULDRONS_LIST);
        if (!data || !Array.isArray(data.pools)) return;
        dispatch(updateCauldrons({ cauldrons: data.pools }));
    };

    useEffect(() => {
        load().catch();
    }, [time]);

    return null;
}
