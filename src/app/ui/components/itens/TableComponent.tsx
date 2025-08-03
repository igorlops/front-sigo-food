// TableComponent.tsx
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export type Column<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

type TableComponentProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export default function TableComponent<T>({ data, columns }: TableComponentProps<T>) {
  return (
    <TableContainer component={Paper} className="my-11">
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Nenhum dado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
