import useAxios from "./useAxios";
import { DEFILLAMA_TVL } from "config/endpoints";
import { useMemo } from "react";

interface Tvl {
    readonly date: number;
    readonly totalLiquidityUSD: number;
}

interface Res {
    readonly tvl: Tvl[];
}

export interface Defillama extends Res {
    readonly loading: boolean;
    readonly error: boolean;
}

export default function (): Defillama {
    const { data, error } = useAxios<Res>(DEFILLAMA_TVL, { method: "GET" });

    return useMemo(() => {
        if (!data || error) {
            return { loading: !error && !data, error: !!error, tvl: [] };
        }
        return {
            loading: false,
            error: false,
            ...data,
        };
    }, [data, error]);
}
