import { createReducer } from "@reduxjs/toolkit";
import { ICauldron } from "../cauldrons/types";
import { selectCauldron } from "./actions";

export interface CauldronState {
    readonly cauldron?: ICauldron;
}

const initialState: CauldronState = {
    cauldron: undefined,
};

export default createReducer<CauldronState>(initialState, builder =>
    builder.addCase(selectCauldron, (state, { payload: { cauldron } }) => {
        return { ...state, cauldron };
    }),
);
