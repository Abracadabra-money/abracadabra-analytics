import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { navConfig, externalNavconfig, socialsConfig } from "./config";
import Logo from "assets/icons/magic-crystal.png";
import NavItem from "./components/NavItem";
import { Link } from "@mui/material";
import Filters from "./components/Filters";

export default function () {
    return (
        <>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                >
                    <img src={Logo} alt="" />
                </Box>
            </Toolbar>
            <Divider
                sx={{
                    margin: "0px 10px",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                }}
            />
            <List>
                {navConfig.map((config, index) => (
                    <NavItem key={index} {...config} />
                ))}
            </List>
            <Divider
                sx={{
                    margin: "0px 10px",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                }}
            />
            <Filters />
            <Divider
                sx={{
                    margin: "0px 10px",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                }}
            />
            <List>
                {externalNavconfig.map((config, index) => (
                    <NavItem key={index} {...config} />
                ))}
            </List>
            <Divider
                sx={{
                    margin: "0px 10px",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                }}
            />
            <Box sx={{ marginTop: "auto", mb: 1, p: 1, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                {socialsConfig.map(({ href, Icon }, index) => (
                    <Box key={index}>
                        <Link target="_blank" href={href}>
                            <Icon />
                        </Link>
                    </Box>
                ))}
            </Box>
        </>
    );
}
