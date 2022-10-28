import { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
// import { useEffect } from "react";
// import { useCurrentTimeState } from "state/currentTime/hooks";

export default function <T>(url?: string, options?: AxiosRequestConfig) {
    //const { time } = useCurrentTimeState();
    const [{ data, error, loading }, refetch] = useAxios<T>({ url, ...options });

    // useEffect(() => {
    //     refetch();
    // }, [time]);

    return { data, error };
}
