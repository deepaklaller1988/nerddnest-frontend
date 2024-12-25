import React from "react";
import Menu from "./Menu";
import User from "@/lib/MenuBar/SideMenu";
import { useSelector } from "react-redux";

const MenuItems: React.FC<any> = ({ toggleSection, openSections, type }) => {
  const userId = useSelector((state: any) => state.auth.id); 
  const menuList = User.list(userId); 
  return (
    <div>
      {menuList.map((item:any, index:any) => {
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
