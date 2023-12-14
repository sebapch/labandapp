'use client'
import Image from "next/image";
import Link from "next/link";


export default function Home() {


  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="flex flex-wrap justify-around w-full">
        {/* Primera fila */}
        <div className="flex items-center justify-center h-1/3 w-full">
        <Link href="/calendario">
            <button className="bg-blue-500 text-white w-48 h-48 rounded m-2">
              CALENDARIO
            </button>
          </Link>
          <Link href="/tareas">
            <button className="bg-green-500 text-white w-48 h-48 rounded m-2">
              TAREAS
            </button>
          </Link>
        </div>

        {/* Segunda fila */}
        <div className="flex items-center justify-center h-1/3 w-full">
          <Link href="/fotos">
            <button className="bg-yellow-500 text-white w-48 h-48 rounded m-2">
              FOTOS
            </button>
          </Link>
          <Link href="/encuesta">
            <button className="bg-purple-500 text-white  w-48 h-48 rounded m-2">
              ENCUESTAS
            </button>
          </Link>
        </div>

        {/* Tercera fila */}
        <div className="flex items-center justify-center h-1/3 w-full">
          <Link href="/competir">
            <button className="bg-red-500 text-white w-48 h-48 rounded m-2">
              COMPETIR
            </button>
          </Link>
          <Link href="/perfil">
            <button className="bg-indigo-500 text-white w-48 h-48 rounded m-2">
              PERFIL
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
