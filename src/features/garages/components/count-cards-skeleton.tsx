export function CountCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Skeleton para o cartão "Total de vagas" */}
      <div data-slot="card" className="bg-white flex flex-col rounded-xl border border-gray-300 p-6 shadow-sm gap-2">
        {/* Placeholder para o título, com pulso individual */}
        <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="flex items-center gap-2">
          {/* Placeholder para o ícone, com pulso individual */}
          <div className="animate-pulse h-5 w-5 bg-gray-200 rounded-full"></div>
          {/* Placeholder para o valor, com pulso individual */}
          <div className="animate-pulse h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      {/* Skeleton para o cartão "Ocupadas" */}
      <div data-slot="card" className="bg-white flex flex-col rounded-xl border border-gray-300 p-6 shadow-sm gap-2">
        {/* Placeholder para o título, com pulso individual */}
        <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="flex items-center gap-2">
          {/* Placeholder para o ícone, com pulso individual */}
          <div className="animate-pulse h-5 w-5 bg-gray-200 rounded-full"></div>
          {/* Placeholder para o valor, com pulso individual */}
          <div className="animate-pulse h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      {/* Skeleton para o cartão "Disponíveis" */}
      <div data-slot="card" className="bg-white flex flex-col rounded-xl border border-gray-300 p-6 shadow-sm gap-2">
        {/* Placeholder para o título, com pulso individual */}
        <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="flex items-center gap-2">
          {/* Placeholder para o ícone, com pulso individual */}
          <div className="animate-pulse h-5 w-5 bg-gray-200 rounded-full"></div>
          {/* Placeholder para o valor, com pulso individual */}
          <div className="animate-pulse h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}
