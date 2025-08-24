"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Eye } from "lucide-react"

import { GarageType } from "@/domain/interfaces/garage"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/base/table"

import { ColumnConfig } from "@/components/ui/table/interfaces"

export type TableProps<T> = {
  data: T[]
  columns: ColumnConfig<T>[]
}

const columns: ColumnConfig<GarageType>[] = [
  { id: "code", header: "Código" },
  { id: "name", header: "Nome" },
  { id: "address", header: "Endereço" },
  { id: "city", header: "Cidade" },
  { id: "state", header: "UF" },
  { id: "region", header: "Regional" },
  { id: "actions", header: "Ações", format: (row) => <Eye size={16} onClick={() => console.log()} /> }
]

export function DataTable<T>(props: TableProps<T>) {
  const formattedColumns: ColumnDef<T>[] = React.useMemo(() => {
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
      sorting: [
        {
          id: "code",
          desc: false
        }
      ]
    }
  })

  return (
    <div className="w-full">
      <Table>
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
    </div>
  )
}
