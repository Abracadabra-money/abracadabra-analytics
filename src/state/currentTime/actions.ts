import { createAction } from "@reduxjs/toolkit";

export const setTime = createAction<{ time: number }>("currentTime/setTime");
