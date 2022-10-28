import { INavConfig } from "../config";
import { Box, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface INavItem extends INavConfig {
    isChildren?: boolean;
}

export default function NavItem({ href, name, childrens, isChildren, external }: INavItem) {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const nav = useNavigate();

    const openExternal = () => window.open(href, "_blank");

    const handleClick = () => (Array.isArray(childrens) ? setOpen(!open) : external ? openExternal() : nav(href ?? ""));

    return (
        <Box>
            <ListItemButton sx={{ pl: isChildren ? 4 : 2 }} onClick={handleClick}>
                <ListItemText
                    sx={{ color: external || Array.isArray(childrens) ? "rgba(255,255,255,0.8)" : pathname === href ? "#fff" : "rgba(255,255,255,0.4)" }}
                    primary={name}
                />
                {Array.isArray(childrens) && (open ? <ExpandLess sx={{ color: "rgba(255,255,255,0.8)" }} /> : <ExpandMore sx={{ color: "rgba(255,255,255,0.8)" }} />)}
            </ListItemButton>
            {Array.isArray(childrens) && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {childrens.map((config, index) => (
                            <NavItem key={index} {...config} isChildren />
                        ))}
                    </List>
                </Collapse>
            )}
        </Box>
    );
}
