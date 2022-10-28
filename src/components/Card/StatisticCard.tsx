import { Box } from "@mui/material";
import Card from "./Card";
import Typography from "@mui/material/Typography";
import { format } from "helpers/format";
import Loader from "../Loader";

interface StatisticCardProps {
    type: "currency" | "percent" | "number";
    value?: number;
    lable: string;
    loading?: boolean;
}

export default function ({ type, value, lable, loading = false }: StatisticCardProps) {
    return (
        <Card>
            <Box>
                <Typography variant="h6" noWrap component="div" align="center" color="#fff">
                    {lable}
                </Typography>
                {!loading && (
                    <Typography variant="h5" noWrap component="div" align="center" color="#fff">
                        {format(type, value || 0)}
                    </Typography>
                )}
                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Loader size={20} />
                    </Box>
                )}
            </Box>
        </Card>
    );
}
