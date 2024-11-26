import React from "react";
import Menu from "./Menu";
import MenuList from "@/lib/MenuBar/SideMenu"
import { MenuItemsProps } from "@/types/sidebarInterfaces";

const MenuItems: React.FC<MenuItemsProps> = ({ toggleSection, openSections, type }) => {

  return (
    <div>
      {MenuList.list.map((item, index) => {
        if (item.name === "Logout" && type == "home") {
          return null;
        }

        return (
          <Menu
            key={index}
            name={item.name}
            icon={item.icon && React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" }) : null} // Check and render icon safely
            links={item.links}
            isOpen={openSections[item.name] || false}
            onToggle={() => toggleSection(item.name)}
          />
        );
      })}
    </div>
  );
};

export default MenuItems;
