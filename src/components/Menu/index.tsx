import { PropsWithChildren, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import DrawerContent from "./components/DrawerContent";
import { DRAWER_WIDTH } from "./config";
import MenuIcon from "@mui/icons-material/Menu";
import MimPrice from "./components/MimPrice";
import AccountSearch from "./components/AccountSearch";
import { useLocation } from "react-router-dom";
import { LIQUIDATIONS_ACCOUNT } from "config/paths";

export default function ({ children }: PropsWithChildren) {
    const { pathname } = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                    backgroundColor: "#2a2835",
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    {pathname === LIQUIDATIONS_ACCOUNT && <AccountSearch />}
                    <Box sx={{ marginLeft: "auto" }}>
                        <MimPrice />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
                    }}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#2a2835",
                        },
                    }}
                >
                    <DrawerContent />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
                    }}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#2a2835",
                        },
                    }}
                    open
                >
                    <DrawerContent />
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, minHeight: "calc(100vh - 112px)" }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
