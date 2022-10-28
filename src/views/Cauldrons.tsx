import Table from "components/Table";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "helpers/format";
import { useAllCaldrons } from "state/cauldrons/hooks";
import { getAddressLink, getNetworkName } from "config/blockchain";
import { Link } from "@mui/material";

const colums: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, align: "left", disableColumnMenu: true, sortable: false, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 100, align: "left", disableColumnMenu: true, flex: 1 },
    {
        field: "network",
        headerName: "Network",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        flex: 1,
        valueFormatter: ({ value }) => getNetworkName(value),
    },
    {
        field: "address",
        headerName: "Address",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        renderCell: ({ row, value }) => (
            <Link href={getAddressLink(value, row.network)} target="_blank" sx={{ color: "#fff" }}>
                <p>Block Explorer</p>
            </Link>
        ),
    },
    {
        field: "totalBorrowed",
        headerName: "Total Borrowed",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        flex: 1,
        valueFormatter: ({ value }) => format("currency", value),
    },
    {
        field: "totalCollaterel",
        headerName: "Total Collateraled",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        flex: 1,
        valueFormatter: ({ value }) => format("currency", value),
    },
];

export default function () {
    const cauldrons = useAllCaldrons();

    return <Table columns={colums} rows={cauldrons} />;
}
