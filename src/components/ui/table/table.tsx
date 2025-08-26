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

export type TableSort = {
  id: string
  desc: boolean
}

export type TableProps<T> = {
  data: T[]
  columns: ColumnConfig<T>[]
  sort?: TableSort
  isPaginated?: boolean
}

export function DataTable<T>({ isPaginated = true, ...props }: TableProps<T>) {
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
    <div className="w-full overflow-x-scroll">
      {props.data && (
        <Table className="min-w-[950px]">
          <TableHeader>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="truncate max-w-[50px]" key={cell.id}>
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
      )}

      {isPaginated && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button size="sm" onClick={() => table.previousPage()}>
              Previous
            </Button>
            <Button size="sm" onClick={() => table.nextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
