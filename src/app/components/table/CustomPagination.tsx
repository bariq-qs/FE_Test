import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Stack, TableHead } from "@mui/material";
import { get } from "lodash";

type TTableCustomPaginationProps<TData> = {
  columns: Array<{
    header: string;
    cell?: (index: number, data: TData) => React.ReactNode;
    field?: keyof TData;
  }>;
  data: Array<TData>;
  totalData: number;
  isLoading?: boolean;
  onPageChange: (newPage: number) => void;
  page: number;
  rowsPerPage: number;
  onRowsPerPageChange: (newPerPage: number) => void;
};

const TableHeader = <T extends unknown>({
  columns,
}: Pick<TTableCustomPaginationProps<T>, "columns">) => {
  return (
    <TableHead
      sx={{
        backgroundColor: "#EBEEF2",
      }}
    >
      <TableRow component='tr'>
        {columns.map((col, colIndex) => (
          <TableCell component='td' key={colIndex}>
            {col.header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableBodyContent = <T extends unknown>({
  columns,
  data,
  isLoading,
}: Pick<TTableCustomPaginationProps<T>, "columns" | "data" | "isLoading">) => {
  return (
    <TableBody>
      {data.length > 0 &&
        !isLoading &&
        data.map((row, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {columns.map((col, colIndex) => {
              if (col.cell) {
                return (
                  <TableCell
                    component='td'
                    key={`row-${rowIndex}-col-${colIndex}`}
                    sx={{
                      borderBottom: "none",
                    }}
                  >
                    {col.cell(rowIndex, row)}
                  </TableCell>
                );
              } else if (col.field) {
                return (
                  <TableCell
                    component='td'
                    key={`row-${rowIndex}-col-${colIndex}`}
                    sx={{
                      borderBottom: "none",
                    }}
                  >
                    {get(row, col.field)}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        ))}
      {isLoading && (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Stack direction='row' justifyContent='center' py={2}>
              <CircularProgress sx={{ color: "#023D95" }} />
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default function TableCustomPagination<T extends unknown>(
  props: TTableCustomPaginationProps<T>
) {
  const {
    columns,
    data,
    isLoading,
    onPageChange,
    page,
    rowsPerPage,
    onRowsPerPageChange,
    totalData,
  } = props;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(rowsPerPage);
    onPageChange(1);
  };

  return (
    <TableContainer sx={{ maxWidth: "100%", height: "100%" }}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableHeader columns={columns} />
        <TableBodyContent columns={columns} data={data} isLoading={isLoading} />
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={columns.length ?? 1}
              count={totalData}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage='Show'
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
