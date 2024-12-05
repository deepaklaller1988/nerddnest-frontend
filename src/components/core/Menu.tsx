import Link from 'next/link';
import React, { useState } from 'react';

import { MenuItemProp } from '@/types/sidebarInterfaces';
import { IoIosArrowDown, IoMdArrowDropright } from 'react-icons/io';
import { useLogoutUser } from '@/utils/logout';

const Menu: React.FC<MenuItemProp> = ({ name, icon, links, isOpen, onToggle }) => {
  const [active, setActive] = useState(false);
  const logout = useLogoutUser()


  const handleToggle = () => {
    if (name === 'Logout') {
      logout()

    } else {
      onToggle();
      setActive(prev => !prev);
    }
  };

  return (
    <div className="w-full">
      <section
        className={`hover:bg-gray-400/10 flex items-center justify-between cursor-pointer ${active ? 'menuActiveSidebar' : ''}`} // Toggle active class
        onClick={handleToggle}
      >
        <span className="flex items-center gap-2 p-3 pl-4">
          <b className="text-[20px]">{icon}</b> {name}
        </span>
        {links && (
          <span className="p-4">
            {name !== "Logout" ? <IoIosArrowDown className={`text-[16px] ${isOpen ? 'rotate-180 fill-white' : ''}`} /> : ""}
          </span>
        )}
      </section>
      {links && isOpen && (
        <section className="bg-black/10 duration-[.5s] max-h-[100vh] overflow-hidden">
          {links.map((link, idx) => (
            <div key={idx}>
              <Link className="hover:bg-gray-200" href={link.href} legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 ">
                  <IoMdArrowDropright className='fill-white' />  {link.name}
                </a>
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Menu;
