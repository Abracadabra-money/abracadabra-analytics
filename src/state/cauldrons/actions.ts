import { createAction } from "@reduxjs/toolkit";
import { ICauldron } from "./types";

export const updateCauldrons = createAction<{ cauldrons: ICauldron[] }>("cauldrons/updateCauldrons");
