"use client"

import { useMemo } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { Button } from "@src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table/base/table"

import { ColumnConfig } from "@src/components/ui/table/interfaces"

export type RoundedTableSort = {
  id: string
  desc: boolean
}

export type RoundedTableProps<T> = {
  data: T[]
  columns: ColumnConfig<T>[]
  sort?: RoundedTableSort
  isPaginated?: boolean
}

export function RoundedDataTable<T>({ isPaginated = true, ...props }: RoundedTableProps<T>) {
  const formattedColumns: ColumnDef<T>[] = useMemo(() => {
    return props.columns.map((column) => ({
      accessorKey: column.id,
      header: column.header,
      cell: ({ row }) => {
        return column.format ? column.format(row.original) : row.getValue(column.id)
      }
    }))
  }, [props.columns])

  const table = useReactTable({
    data: props.data,
    columns: formattedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: props.sort ? [props.sort] : []
    }
  })

  return (
    <div className="w-full border-2 border-gray-tertiary rounded-lg">
      <Table className="border-none min-w-[1000px]">
        <TableHeader className="border-none font-extrabold text-gray-primary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-bg-primary">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="border-none" key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="truncate max-w-[100px]" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={props.columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isPaginated && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
