import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { FaCcDiscover } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";

import Menu from "./Menu";
import { MenuItem, MenuItemsProps } from "@/types/sidebarInterfaces";

const MenuItems: React.FC<MenuItemsProps> = ({ toggleSection, openSections }) => {
  const menuItems: MenuItem[] = [
    {
      name: "Profile",
      icon: <CgProfile />,
      links: [
        { name: "View", href: "/profile/view" },
        { name: "Edit", href: "/profile/edit" },
        { name: "Profile Photo", href: "/profile/photo" },
        { name: "Cover Photo", href: "/profile/cover" },
      ],
    },
    {
      name: "Games Hub",
      icon: <IoLogoGameControllerB />,
      links: [{ name: "Hub", href: "/account/login" }],
    },
    {
      name: "Discover",
      icon: <FaCcDiscover />,
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
      icon: <CiSettings />,
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
