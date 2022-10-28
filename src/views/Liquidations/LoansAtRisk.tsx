import Table from "components/Table";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import useLoansAtRisk from "hooks/useLoansAtRisk";
import { format } from "helpers/format";

const colums: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, align: "left", disableColumnMenu: true, sortable: false, flex: 1 },
    { field: "address", headerName: "Account", minWidth: 100, align: "left", disableColumnMenu: true, sortable: false, flex: 1 },
    { field: "pool", headerName: "Name", minWidth: 100, align: "left", disableColumnMenu: true, sortable: false, flex: 1 },
    {
        field: "value",
        headerName: "Value at Risk ($)",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => format("currency", value),
    },
    {
        field: "ltv",
        headerName: "LTV (%)",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => format("percent", value),
    },
    {
        field: "maxLtv",
        headerName: "Max TVL (%)",
        minWidth: 100,
        align: "left",
        disableColumnMenu: true,
        sortable: false,
        flex: 1,
        valueFormatter: ({ value }) => format("percent", value),
    },
];

export default function () {
    const [page, setPage] = useState(0);

    const { loading, loans, pagination } = useLoansAtRisk(page);

    return <Table page={page} setPage={setPage} columns={colums} rows={loans} total={pagination.total ?? 0} loading={loading} />;
}
