import { Box } from "@mui/material";
import Card from "../Card/Card";
import { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import Loader from "../Loader";
import NotFound from "assets/icons/not-found.png";

interface ChartWrapProps extends PropsWithChildren {
    loading?: boolean;
    title?: string;
    empty?: boolean;
}

export default function ({ loading, children, title, empty }: ChartWrapProps) {
    return (
        <Card>
            <Typography variant="h6" noWrap component="div" align="center" color="#fff">
                {title}
            </Typography>
            <Box
                sx={{
                    height: 400,
                }}
            >
                {loading && (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Loader size={50} />
                    </Box>
                )}
                {!loading && empty && (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h6" noWrap component="div" align="center" color="#fff">
                            Statistics not found. Try other search options.
                        </Typography>
                        <Box
                            sx={{
                                width: 100,
                            }}
                        >
                            <img src={NotFound} alt="" />
                        </Box>
                    </Box>
                )}
                {!loading && !empty && children}
            </Box>
        </Card>
    );
}
