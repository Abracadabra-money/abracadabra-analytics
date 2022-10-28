import { createAction } from "@reduxjs/toolkit";
import { AssetType } from "config/types";

export const selectAsset = createAction<{ type: AssetType }>("asset/selectAsset");
