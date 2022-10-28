import { createReducer } from "@reduxjs/toolkit";
import { setAccount } from "./actions";
import { isAddress } from "@ethersproject/address";

export interface AccountState {
    readonly account: string;
}

const initialState: AccountState = {
    account: "",
};

export default createReducer<AccountState>(initialState, builder =>
    builder.addCase(setAccount, (state, { payload: { account } }) => {
        if (!isAddress(account)) return state;

        return { ...state, account };
    }),
);
