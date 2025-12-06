import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography
} from "@mui/material";
import { Inbox } from "@mui/icons-material";

export type Column<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

type TableComponentProps<T> = {
  data: T[];
  columns: Column<T>[];
};

const colors = {
  primaryBlue: '#1e3a8a',
  accentYellow: '#fcd34d',
  bgLight: '#fafaf9',
};

export default function TableComponent<T>({ data, columns }: TableComponentProps<T>) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        my: 3,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(30, 58, 138, 0.08)',
        overflow: 'hidden',
        border: '1px solid rgba(30, 58, 138, 0.1)',
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: colors.primaryBlue,
              '& th': {
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                py: 2,
              },
            }}
          >
            {columns.map((col, index) => (
              <TableCell key={index}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:nth-of-type(odd)': {
                    bgcolor: colors.bgLight,
                  },
                  '&:hover': {
                    bgcolor: 'rgba(252, 211, 77, 0.1)',
                    transform: 'scale(1.001)',
                    boxShadow: '0 2px 8px rgba(30, 58, 138, 0.1)',
                  },
                  '& td': {
                    py: 2,
                    fontSize: '0.875rem',
                  },
                }}
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>{col.render(row)}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 6,
                    gap: 2,
                  }}
                >
                  <Inbox
                    sx={{
                      fontSize: 60,
                      color: '#9ca3af',
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#6b7280',
                      fontWeight: 500,
                    }}
                  >
                    Nenhum dado encontrado
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#9ca3af',
                    }}
                  >
                    Comece adicionando novos itens
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
