export function PlansTableSkeleton() {
  const rows = Array.from({ length: 2 }, (_, index) => index)

  return (
    <div className="w-full border-2 border-gray-300 rounded-lg">
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <table
          data-slot="table"
          className="w-full caption-bottom text-sm rounded-md border border-gray-300 border-none"
        >
          <thead
            data-slot="table-header"
            className="[&>tr]:border-b-2 border-t border-t-gray-300 border-none font-extrabold text-gray-800"
          >
            <tr data-slot="table-row" className="transition-colors border-b-gray-300 border-b">
              <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                Descrição
              </th>
              <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                Valor
              </th>
              <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                Vagas
              </th>
              <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                Status
              </th>
              <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                Ações
              </th>
            </tr>
          </thead>
          <tbody data-slot="table-body" className="bg-white">
            {rows.map((_, index) => (
              <tr
                key={index}
                data-slot="table-row"
                className="transition-colors border-b-gray-300 border-b animate-pulse"
              >
                {/* Célula de Descrição - Simula o conteúdo com divs de placeholder */}
                <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full max-w-[150px]"></div>
                  </div>
                </td>
                {/* Célula de Valor */}
                <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                  <div className="h-4 bg-gray-200 rounded w-full max-w-[80px]"></div>
                </td>
                {/* Célula de Vagas */}
                <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                  <div className="h-4 bg-gray-200 rounded w-full max-w-[40px]"></div>
                </td>
                {/* Célula de Status - Simula o badge */}
                <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </td>
                {/* Célula de Ações - Simula o botão de edição */}
                <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                  <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
