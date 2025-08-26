import React from "react"

// Este componente cria um esqueleto de tabela que mimetiza
// a estrutura e as proporções do layout de tabela fornecido pelo usuário.
// Ele utiliza a animação 'pulse' do Tailwind CSS para simular um
// estado de carregamento dinâmico.
export function GaragesTableSkeleton() {
  return (
    <div className="flex justify-center p-4  font-sans antialiased w-full">
      <div className="w-full min-w-[950px]">
        <div data-slot="table-container" className="relative w-full overflow-x-auto">
          <table
            data-slot="table"
            className="w-full caption-bottom text-sm rounded-md border border-gray-tertiary min-w-[950px]"
          >
            <thead
              data-slot="table-header"
              className="[&_tr]:border-b-2 border-t border-t-gray-tertiary text-gray-secondary"
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

            <tbody data-slot="table-body">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  data-slot="table-row"
                  className="animate-pulse hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors border-b-gray-tertiary border-b"
                >
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-12"></div>
                  </td>
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-24"></div>
                  </td>
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-48"></div>
                  </td>
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-20"></div>
                  </td>
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-8"></div>
                  </td>
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-20"></div>
                  </td>
                  <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap truncate max-w-[50px]">
                    <div className="h-4 bg-gray-200  rounded-md w-8"></div>
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
