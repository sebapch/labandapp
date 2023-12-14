export default function Fotos(){
    return(
        <>
         <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Fotos</h1>

      {/* Galería de fotos */}
      <div className="grid grid-cols-3 gap-4">
        {/* Representación de imágenes (cuadrados grises) */}
        {[1, 2, 3, 4, 5, 6].map((imagen) => (
          <div
            key={imagen}
            className="bg-gray-300 h-40 flex items-center justify-center rounded-md"
          >
            {/* Aquí podrías agregar la lógica para mostrar las imágenes */}
          </div>
        ))}
      </div>

      {/* Botón flotante para subir archivos */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
        </>
    )
}