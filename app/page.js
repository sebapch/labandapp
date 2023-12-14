import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-12">
      <div className="flex flex-wrap justify-around w-full">
        {/* Primera fila */}
        <div className="flex items-center justify-center h-1/3 w-full">
          <button className="bg-blue-500 text-white w-48 h-48 rounded m-2">CALENDARIO</button>
          <button className="bg-green-500 text-white w-48 h-48 rounded m-2">TAREAS</button>
        </div>

        {/* Segunda fila */}
        <div className="flex items-center justify-center h-1/3 w-full">
          <button className="bg-yellow-500 text-white w-48 h-48 rounded m-2">FOTOS</button>
          <button className="bg-purple-500 text-white  w-48 h-48 rounded m-2">ENCUESTAS</button>
        </div>

        {/* Tercera fila */}
        <div className="flex items-center justify-center h-1/3 w-full">
          <button className="bg-red-500 text-white w-48 h-48 rounded m-2">COMPETIR</button>
          <button className="bg-indigo-500 text-white w-48 h-48 rounded m-2">PERFIL</button>
        </div>

      </div>
    </main>
  );
}
