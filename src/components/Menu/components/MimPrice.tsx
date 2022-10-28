import { Box } from "@mui/material";
import MimIcon from "assets/icons/mim-icon.svg";
import Loader from "components/Loader";
import useMimPrice from "hooks/useMimPrice";
import { formatToFixed } from "helpers/format";

export default function () {
    const { loading, price } = useMimPrice();

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 32, height: 32 }}>
                <img src={MimIcon} alt="" />
            </Box>
            <Box sx={{ ml: 1 }}>{loading ? <Loader size={16} /> : `$${formatToFixed(4, price)}`}</Box>
        </Box>
    );
}
