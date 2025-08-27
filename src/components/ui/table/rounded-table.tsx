"use client"

import { flexRender } from "@tanstack/react-table"

import { Button } from "@src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table/base/table"
import { TableWrapper, TableProps } from "@src/components/ui/table/base/table-wrapper"

export function RoundedDataTable<T>({ isPaginated = true, ...props }: TableProps<T>) {
  return (
    <div className="w-full border-2 border-gray-tertiary rounded-lg">
      <TableWrapper {...props}>
        {(tableSettings) => (
          <>
            {tableSettings && props.data && (
              <Table className="border-none min-w-[1000px]">
                <TableHeader className="border-none font-extrabold text-gray-primary">
                  {tableSettings.getHeaderGroups().map((headerGroup) => (
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
                <TableBody className="bg-bg-primary">
                  {tableSettings.getRowModel().rows?.length ? (
                    tableSettings.getRowModel().rows.map((row) => (
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
            )}

            {isPaginated && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                  <Button
                    size="sm"
                    onClick={() => tableSettings.previousPage()}
                    disabled={!tableSettings.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button size="sm" onClick={() => tableSettings.nextPage()} disabled={!tableSettings.getCanNextPage()}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </TableWrapper>
    </div>
  )
}
