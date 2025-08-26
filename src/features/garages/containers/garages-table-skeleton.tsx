import React from "react"

// O componente SkeletonTable replica fielmente a estrutura de tabela
// fornecida, usando divs e a animação pulse do Tailwind CSS para
// simular o estado de carregamento.
export function GaragesTableSkeleton() {
  return (
    <div className="flex justify-center p-4 bg-gray-50  min-h-screen font-sans antialiased">
      <div className="w-full max-w-7xl">
        <div data-slot="table-container" className="relative w-full overflow-x-auto">
          <table
            data-slot="table"
            className="w-full caption-bottom text-sm rounded-md border border-gray-tertiary min-w-[950px]"
          >
            {/* Cabeçalho da Tabela */}
            <thead
              data-slot="table-header"
              className="[&amp;_tr]:border-b-2 border-t border-t-gray-tertiary text-gray-secondary"
            >
              <tr
                data-slot="table-row"
                className="hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors border-b-gray-tertiary border-b"
              >
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Código
                </th>
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Nome
                </th>
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Endereço
                </th>
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Cidade
                </th>
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  UF
                </th>
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Regional
                </th>
                <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                  Ações
                </th>
              </tr>
            </thead>
            {/* Corpo da Tabela com a Animação de Esqueleto */}
            <tbody data-slot="table-body">
              {/* Cria 5 linhas de esqueleto animadas */}
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  data-slot="table-row"
                  className="animate-pulse hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors border-b-gray-tertiary border-b"
                >
                  {/* Célula do Código */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-12"></div>
                  </td>
                  {/* Célula do Nome */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-24"></div>
                  </td>
                  {/* Célula do Endereço */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-full"></div>
                  </td>
                  {/* Célula da Cidade */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-20"></div>
                  </td>
                  {/* Célula da UF */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-8"></div>
                  </td>
                  {/* Célula do Regional */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-20"></div>
                  </td>
                  {/* Célula das Ações */}
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded w-8"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
