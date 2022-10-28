import { alpha, Box, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useAppDispatch } from "state";
import { setAccount } from "state/account/actions";

interface SearchProps {}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
    [theme.breakpoints.up("xs")]: {
        marginRight: theme.spacing(3),
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function ({}: SearchProps) {
    const dispatch = useAppDispatch();

    const onChange = (_event: any) => {
        const { value } = _event.target;
        dispatch(setAccount({ account: value }));
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase onChange={onChange} placeholder="Enter address" inputProps={{ "aria-label": "search" }} />
            </Search>
        </Box>
    );
}
