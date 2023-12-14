'use client'
import React, {useState} from 'react'
import Link from 'next/link';


const Menu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  
    const closeMenu = () => {
      setMenuOpen(false);
    };
  
    const menuItems = [
      { title: 'Calendario', path: '/calendario' },
      { title: 'Tareas', path: '/tareas' },
      { title: 'Fotos', path: '/fotos' },
      { title: 'Encuestas', path: '/encuestas' },
      { title: 'Competir', path: '/competir' },
      { title: 'Perfil', path: '/perfil' },
    ];

  return (
    <div className="">
    <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
      MENU
    </div>
    {isMenuOpen && (
      <div className="flex flex-col items-end bg-blue-900 text-white p-4 mt-2">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <span onClick={closeMenu}>{item.title}</span>
          </Link>
        ))}
      </div>
    )}
  </div>
  )
}

export default Menu