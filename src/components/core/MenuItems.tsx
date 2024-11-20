import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdSettingsBrightness } from "react-icons/md";
import { LiaCcDiscover } from "react-icons/lia";
import { CgGames } from "react-icons/cg";

import Menu from "./Menu";
import MenuList from "@/lib/MenuBar/SideMenu"
import { MenuItem, MenuItemsProps } from "@/types/sidebarInterfaces";

const MenuItems: React.FC<MenuItemsProps> = ({ toggleSection, openSections }) => {

  return (
    <div>
      {MenuList.list.map((item, index) => (
        <Menu
          key={index}
          name={item.name}
          icon={<item.icon className="w-5 h-5"/>}
          links={item.links} 
          isOpen={openSections[item.name] || false}
          onToggle={() => toggleSection(item.name)} 
        />
      ))}
    </div>
  );
};

export default MenuItems;
