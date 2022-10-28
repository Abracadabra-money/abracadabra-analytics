import { createReducer } from "@reduxjs/toolkit";
import { Networks } from "config/blockchain";
import { selectNetwork } from "./actions";

export interface NetworkState {
    readonly network: Networks;
}

const initialState: NetworkState = {
    network: Networks.UNKNOW,
};

export default createReducer<NetworkState>(initialState, builder =>
    builder.addCase(selectNetwork, (state, { payload: { network } }) => {
        return { ...state, network };
    }),
);
