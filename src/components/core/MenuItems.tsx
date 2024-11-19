import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdSettingsBrightness } from "react-icons/md";
import { LiaCcDiscover } from "react-icons/lia";
import { CgGames } from "react-icons/cg";

import Menu from "./Menu";
import { MenuItem, MenuItemsProps } from "@/types/sidebarInterfaces";

const MenuItems: React.FC<MenuItemsProps> = ({ toggleSection, openSections }) => {
  const menuItems: MenuItem[] = [
    {
      name: "Profile",
      icon: <CgProfile className="w-5 h-5" />,
      links: [
        { name: "View", href: "/profile/view" },
        { name: "Edit", href: "/profile/edit" },
        { name: "Profile Photo", href: "/profile/photo" },
        { name: "Cover Photo", href: "/profile/cover" },
      ],
    },
    {
      name: "Games Hub",
      icon: <CgGames  className="w-5 h-5"/>,
      links: [{ name: "Hub", href: "/account/login" }],
    },
    {
      name: "Discover",
      icon: <LiaCcDiscover  className="w-5 h-5"/>,
      links: [
        { name: "Login Information", href: "/account/login" },
        { name: "Notification Settings", href: "/account/notifications" },
        { name: "Privacy", href: "/account/privacy" },
        { name: "Blocked Members", href: "/account/blocked" },
        { name: "Group Invites", href: "/account/groups" },
        { name: "Export Data", href: "/account/export" },
      ],
    },
    {
      name: "Settings",
      icon: <MdSettingsBrightness  className="w-5 h-5"/>,
      links: [
        { name: "Login Information", href: "/account/login" },
        { name: "Notification Settings", href: "/account/notifications" },
        { name: "Privacy", href: "/account/privacy" },
        { name: "Blocked Members", href: "/account/blocked" },
        { name: "Group Invites", href: "/account/groups" },
        { name: "Export Data", href: "/account/export" },
      ],
    },
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <Menu
          key={index}
          name={item.name}
          icon={item.icon}
          links={item.links} 
          isOpen={openSections[item.name] || false}
          onToggle={() => toggleSection(item.name)} 
        />
      ))}
    </div>
  );
};

export default MenuItems;
