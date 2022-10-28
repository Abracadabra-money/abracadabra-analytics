import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";

export default function ({ children }: PropsWithChildren) {
    return (
        <Paper sx={{ padding: 2, backgroundColor: "#2b2b3c" }} elevation={3}>
            {children}
        </Paper>
    );
}
