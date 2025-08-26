import React from "react"

export function PlansTableSkeleton() {
  const numRows = 3
  const numCols = 7

  const skeletonRows = Array.from({ length: numRows }, (_, rowIndex) => (
    <tr
      key={rowIndex}
      className="hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors border-b-gray-tertiary border-b"
      data-state="false"
    >
      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] truncate max-w-[100px]">
        <div className="flex items-center gap-2">
          <div className="animate-pulse h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </td>

      {Array.from({ length: numCols - 1 }, (_, colIndex) => (
        <td
          key={colIndex}
          className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] truncate max-w-[100px]"
        >
          <div
            className={`animate-pulse h-4 bg-gray-200 rounded ${
              colIndex === 0
                ? "w-1/2"
                : colIndex === 1
                ? "w-1/4"
                : colIndex === 2
                ? "w-1/4"
                : colIndex === 3
                ? "w-1/4"
                : colIndex === 4
                ? "w-1/3"
                : "w-1/4"
            }`}
          ></div>
        </td>
      ))}
    </tr>
  ))

  return (
    <div className="w-full border-2 border-gray-tertiary rounded-lg">
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <table
          data-slot="table"
          className="w-full caption-bottom text-sm rounded-md border border-gray-tertiary border-none min-w-[1000px]"
        >
          <thead
            data-slot="table-header"
            className="[&_tr]:border-b-2 border-t border-t-gray-tertiary border-none font-extrabold text-gray-primary"
          >
            <tr
              data-slot="table-row"
              className="hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors border-b-gray-tertiary border-b"
            >
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Descrição
              </th>
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Valor
              </th>
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Vagas
              </th>
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Ocupadas
              </th>
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Disponíveis
              </th>
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Status
              </th>
              <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg-primary">{skeletonRows}</tbody>
        </table>
      </div>
    </div>
  )
}
