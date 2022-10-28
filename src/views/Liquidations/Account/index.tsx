import Table from "components/Table";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { format } from "helpers/format";
import useLiquidationAccount from "hooks/useLiquidationAccount";
import moment from "moment";
import { Link } from "@mui/material";
import { getTransactionLink, getNetworkName } from "config/blockchain";

const colums: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, align: "left", disableColumnMenu: true, sortable: false, flex: 0.5 },
    {
        field: "network",
        headerName: "Network",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => getNetworkName(value),
    },
    { field: "pool", headerName: "Name", minWidth: 100, align: "left", disableColumnMenu: true, sortable: false, flex: 1 },
    {
        field: "liquidationPrice",
        headerName: "Liquidation Price",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => format("currency", value),
    },
    {
        field: "collateral",
        headerName: "Collateral Removed",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => format("currency", value),
    },
    {
        field: "repaid",
        headerName: "Loan Repaid",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => format("currency", value),
    },
    {
        field: "hash",
        headerName: "Transaction",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        renderCell: ({ row, value }) => (
            <Link href={getTransactionLink(value, row.network)} target="_blank" sx={{ color: "#fff" }}>
                <p>Block Explorer</p>
            </Link>
        ),
    },
    {
        field: "date",
        headerName: "Timestamp",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => moment(value).format("D.MM.YYYY, HH:mm:ss"),
    },
];

export default function () {
    const [page, setPage] = useState(0);
    const { loading, loans, pagination } = useLiquidationAccount(page);

    return <Table page={page} setPage={setPage} columns={colums} rows={loans} total={pagination.total ?? 0} loading={loading} />;
}
