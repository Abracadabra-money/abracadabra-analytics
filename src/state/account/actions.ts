import { createAction } from "@reduxjs/toolkit";

export const setAccount = createAction<{ account: string }>("account/setAccount");
