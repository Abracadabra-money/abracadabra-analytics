import Select from "components/Select";
import { useNetworkList, useNetworkState } from "state/network/hooks";
import { selectNetwork } from "state/network/actions";
import { useAppDispatch } from "state";
import { Networks } from "config/blockchain";
import { AssetType } from "config/types";
import { useAssetState, useAssetTypeList } from "state/asset/hooks";
import { selectAsset } from "state/asset/actions";
import { useCauldronList, useCauldronsState } from "state/cauldrons/hooks";
import { useCauldronState } from "state/cauldron/hooks";
import { useMemo } from "react";
import { selectCauldron } from "state/cauldron/actions";
import ListItem from "@mui/material/ListItem";
import { List } from "@mui/material";

export default function () {
    const dispatch = useAppDispatch();
    const { network } = useNetworkState();
    const { type } = useAssetState();
    const { cauldron } = useCauldronState();
    const { cauldrons } = useCauldronsState();

    const networksList = useNetworkList();
    const assetTypeList = useAssetTypeList();
    const cauldronsList = useCauldronList();

    const updateNetwork = (network: Networks) => {
        dispatch(selectNetwork({ network }));
    };

    const updateAsset = (type: AssetType) => {
        dispatch(selectAsset({ type }));
    };

    const updateCauldron = (key: string) => {
        if (!key) {
            return dispatch(selectCauldron({ cauldron: undefined }));
        }
        const _cauldron = cauldrons.find(cauldron => cauldron.id === key);
        dispatch(selectCauldron({ cauldron: _cauldron }));
    };

    const selectedCauldron = useMemo(() => (cauldron ? cauldron.id : 0), [cauldron]);

    return (
        <List>
            <ListItem>
                <Select lable="Cauldron" value={selectedCauldron} defaultValue={0} list={cauldronsList} handleChange={updateCauldron} />
            </ListItem>
            <ListItem>
                <Select lable="Network" value={network} defaultValue={Networks.UNKNOW} list={networksList} handleChange={updateNetwork} />
            </ListItem>
            <ListItem>
                <Select lable="Asset Type" value={type} defaultValue={AssetType.UNKNOW} list={assetTypeList} handleChange={updateAsset} />
            </ListItem>
        </List>
    );
}
