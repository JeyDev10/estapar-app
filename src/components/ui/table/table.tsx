"use client"

import { useMemo } from "react"
import { flexRender, Table as TanstackTable } from "@tanstack/react-table"

import { Button } from "@src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table/base/table"
import { TableWrapper, TableProps, TableSort } from "@src/components/ui/table/base/table-wrapper"

export function DataTable<T>({ isPaginated = false, ...props }: TableProps<T>) {
  return (
    <div className="w-full">
      <TableWrapper<T> {...props}>
        {(tableSettings: TanstackTable<T>) => {
          return (
            <>
              {tableSettings && props.data && (
                <Table className="min-w-[950px]">
                  <TableHeader>
                    {tableSettings?.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {tableSettings.getRowModel().rows?.length ? (
                      tableSettings.getRowModel?.().rows.map((row) => (
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
                        <TableCell colSpan={tableSettings.getAllColumns().length} className="h-24 text-center">
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
                    <Button size="sm" onClick={() => tableSettings.previousPage()}>
                      Previous
                    </Button>
                    <Button size="sm" onClick={() => tableSettings.nextPage()}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )
        }}
      </TableWrapper>
    </div>
  )
}
