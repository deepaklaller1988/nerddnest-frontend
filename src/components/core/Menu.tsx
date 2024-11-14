import React from 'react';
import { IoIosArrowDown, IoMdArrowDropright } from 'react-icons/io';

interface MenuItemProps {
  name: string;
  icon: React.ReactNode;
  links?: string[];
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;  
}

const Menu: React.FC<MenuItemProps> = ({ name, icon, links, isOpen, onToggle}) => (
  <div className="w-full">
    <section className="hover:bg-gray-400/10 flex items-center justify-between" onClick={onToggle}>
      <span className="flex items-center gap-2 p-3 pl-4 userHover">
        {icon} {name}
      </span>
      {links && (
        <span className="p-4 cursor-pointer">
          <IoIosArrowDown className="text-[16px]" />
        </span>
      )}
    </section>
    {links && isOpen && (
      <section className="bg-black/5 duration-[.5s] max-h-[100vh] overflow-hidden">
        {links.map((link, idx) => (
          <div key={idx} className="px-4 py-2">
            <span className="flex items-center gap-2">
              <IoMdArrowDropright /> {link}
            </span>
          </div>
        ))}
      </section>
    )}
  </div>
);

export default Menu;
