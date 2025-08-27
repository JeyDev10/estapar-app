"use client"

import { useMemo, ReactNode } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  useReactTable
} from "@tanstack/react-table"

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
} & { children?(tableState: Table<T>): ReactNode }

export function TableWrapper<T>({ isPaginated = true, ...props }: TableProps<T>) {
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

  return <div className="w-full">{props?.children?.(table)}</div>
}
