import Link from 'next/link';
import React from 'react';

import { MenuItemProp } from '@/types/sidebarInterfaces';
import { IoIosArrowDown, IoMdArrowDropright } from 'react-icons/io';

const Menu: React.FC<MenuItemProp> = ({ name, icon, links, isOpen, onToggle }) => (
  <div className="w-full">
    <section
      className="hover:bg-gray-400/10 flex items-center justify-between cursor-pointer"
      onClick={onToggle}
    >
      <span className="flex items-center gap-2 p-3 pl-4">
        <b className='text-[20px]'>{icon}</b> {name}
      </span>
      {links && (
        <span className="p-4">
          <IoIosArrowDown className={`text-[16px] ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      )}
    </section>
    {links && isOpen && (
      <section className="bg-black/5 duration-[.5s] max-h-[100vh] overflow-hidden">
        {links.map((link, idx) => (
          <div key={idx}>
            <Link className="hover:bg-gray-200" href={link.href} legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-2 ">
                <IoMdArrowDropright /> {link.name}
              </a>
            </Link>
          </div>
        ))}
      </section>
    )}
  </div>
);

export default Menu;
