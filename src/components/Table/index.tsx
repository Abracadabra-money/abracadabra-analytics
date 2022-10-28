import { Paper } from "@mui/material";
import { DataGrid, GridColDef, DataGridProps, GridValidRowModel } from "@mui/x-data-grid";
import { DEFAULT_PAGE_SIZE } from "config/table";
import "./table.scss";

interface TabelProps {
    page?: number;
    setPage?: (page: number) => void;
    columns: GridColDef[];
    rows: any[];
    total?: number;
    loading?: boolean;
    tableProps?: DataGridProps;
}

export default function ({ page, setPage, columns, rows, total, loading, tableProps }: TabelProps) {
    const handleChangePage = (newPage: number) => setPage && setPage(newPage);

    return (
        <Paper className="table-wrap">
            <DataGrid
                className="table"
                onPageChange={handleChangePage}
                rowCount={total}
                pageSize={DEFAULT_PAGE_SIZE}
                page={page}
                paginationMode="server"
                loading={loading}
                rows={rows}
                columns={columns}
                getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? "secondary" : "primary")}
                {...tableProps}
            />
        </Paper>
    );
}
