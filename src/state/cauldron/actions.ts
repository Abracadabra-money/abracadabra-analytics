import { createAction } from "@reduxjs/toolkit";
import { ICauldron } from "../cauldrons/types";

export const selectCauldron = createAction<{ cauldron?: ICauldron }>("cauldron/selectCauldron");
