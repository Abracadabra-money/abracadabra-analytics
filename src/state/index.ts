import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { save, load } from "redux-localstorage-simple";
import asset from "./asset/reducer";
import network from "./network/reducer";
import cauldrons, { initialState as cauldronsInitialState } from "./cauldrons/reducer";
import currentTime from "./currentTime/reducer";
import cauldron from "./cauldron/reducer";
import account from "./account/reducer";

const PERSISTED_KEYS: string[] = ["cauldrons"];

const safeCloneDeep = <T>(state: T) => {
    try {
        return JSON.parse(JSON.stringify(state)) as T;
    } catch (error) {
        console.error(error);
        return cloneDeep(state);
    }
};

const store = configureStore({
    reducer: {
        asset,
        network,
        cauldrons,
        currentTime,
        cauldron,
        account,
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS, debounce: 1000 })],
    preloadedState: load({
        states: PERSISTED_KEYS,
        preloadedState: {
            cauldrons: safeCloneDeep(cauldronsInitialState),
        },
    }),
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
