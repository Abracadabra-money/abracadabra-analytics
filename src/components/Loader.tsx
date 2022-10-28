import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";

export default function (props: CircularProgressProps) {
    return (
        <div style={{ color: "#fff" }}>
            <CircularProgress color="inherit" {...props} />
        </div>
    );
}
