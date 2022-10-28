import { createReducer } from "@reduxjs/toolkit";
import { setTime } from "./actions";

export interface CurrentTimeState {
    readonly time: number;
}

const initialState: CurrentTimeState = {
    time: Date.now(),
};

export default createReducer<CurrentTimeState>(initialState, builder =>
    builder.addCase(setTime, (state, { payload: { time } }) => {
        return { ...state, time };
    }),
);
