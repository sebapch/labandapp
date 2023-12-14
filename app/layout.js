import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Menu from './_components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LaBandapp',
  description: 'hoy cy',
}

const menuItems = ['Calendario', 'Tareas', 'Fotos', 'Encuestas', 'Competir', 'Perfil']


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-blue-900 text-white p-4 flex justify-between">
          <div>
          <Link href="/">
            ATRAS
            </Link>
          </div>
          <div>
            Labandapp
          </div>
          <div>
            <Menu />
          </div>
        </div>
        {children}
        </body>
    </html>
  )
}
