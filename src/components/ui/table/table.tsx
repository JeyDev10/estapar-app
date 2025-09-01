"use client"

import { flexRender, Table as TanstackTable } from "@tanstack/react-table"

import { Button } from "@src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table/base/table"
import { TableWrapper, TableProps } from "@src/components/ui/table/base/table-wrapper"

export function DataTable<T>({ ...props }: TableProps<T>) {
  return (
    <div className="w-full border border-gray-tertiary pb-2 rounded-lg">
      <TableWrapper<T> {...props}>
        {(tableSettings: TanstackTable<T>) => {
          return (
            <>
              {tableSettings && props.data && (
                <Table className="border-none min-w-[950px]">
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
                  <TableBody className="border-x border-x-gray-tertiary">
                    {tableSettings.getRowModel().rows?.length ? (
                      tableSettings.getRowModel?.().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              title={cell.getValue() as string}
                              className="truncate max-w-[50px]"
                              key={cell.id}
                            >
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
            </>
          )
        }}
      </TableWrapper>
    </div>
  )
}
