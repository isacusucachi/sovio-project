import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
  ITEMS_PER_PAGE: number;
  currentPage: number;
}

export default function BasicTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  ITEMS_PER_PAGE,
  currentPage,
}: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
              >
                #
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  isHeader
                  className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                >
                  {column.label}
                </TableCell>
              ))}
              {actions && (
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                >
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.length > 0 ? (
              data.map((row, rowIndex) => {
                const globalIndex =
                  (currentPage - 1) * ITEMS_PER_PAGE + rowIndex + 1; // ✅ Calcula el índice global

                return (
                  <TableRow key={rowIndex}>
                    {/* 🔹 Agregar numeración manualmente como primera columna */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {globalIndex}
                    </TableCell>

                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key])}
                      </TableCell>
                    ))}

                    {actions && (
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {actions(row)}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
                >
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
