import { createReducer } from "@reduxjs/toolkit";
import { AssetType } from "config/types";
import { selectAsset } from "./actions";

export interface AssetState {
    readonly type: AssetType;
}

const initialState: AssetState = {
    type: AssetType.UNKNOW,
};

export default createReducer<AssetState>(initialState, builder =>
    builder.addCase(selectAsset, (state, { payload: { type } }) => {
        return { ...state, type };
    }),
);
