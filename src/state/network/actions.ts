import { createAction } from "@reduxjs/toolkit";
import { Networks } from "config/blockchain";

export const selectNetwork = createAction<{ network: Networks }>("network/selectNetwork");
