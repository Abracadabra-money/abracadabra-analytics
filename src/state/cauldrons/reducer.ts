import { createReducer } from "@reduxjs/toolkit";
import { ICauldron } from "./types";
import { updateCauldrons } from "./actions";

export interface CauldronsState {
    readonly cauldrons: ICauldron[];
}

export const initialState: CauldronsState = {
    cauldrons: [],
};

export default createReducer<CauldronsState>(initialState, builder =>
    builder.addCase(updateCauldrons, (state, { payload: { cauldrons } }) => {
        return { ...state, cauldrons };
    }),
);
