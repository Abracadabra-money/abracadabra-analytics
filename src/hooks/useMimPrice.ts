import { MIM_PRICE } from "config/endpoints";
import useAxios from "hooks/useAxios";
import { useMemo } from "react";

interface Res {
    readonly price: number | string;
}

interface Result extends Res {
    readonly loading: boolean;
    readonly error: boolean;
}

export default function (): Result {
    const { data, error } = useAxios<Res>(MIM_PRICE, { method: "GET" });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error, price: 0 };
        }
        return {
            loading: false,
            error: false,
            price: data.price,
        };
    }, [data, error]);
}
