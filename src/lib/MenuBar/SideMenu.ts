import { MenuItem } from "@/types/sidebarInterfaces";
import { CgProfile } from "react-icons/cg";
import { MdSettingsBrightness } from "react-icons/md";
import { LiaCcDiscover } from "react-icons/lia";
import { CgGames } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io"; 


export default class User {
  static list = (userId: string): any => [
    {
          name: "Profile",
          icon: CgProfile,
          links: [
            { name: "View", href: `users?id=${userId}` },
            { name: "Edit", href: "/profile/edit" },
            { name: "Profile Photo", href: "/profile/photo" },
            { name: "Cover Photo", href: "/profile/cover" },
          ],
        },
        {
          name: "Games Hub",
          icon: CgGames,
          links: [{ name: "Hub", href: "/account/login" }],
        },
        {
          name: "Discover",
          icon: LiaCcDiscover,
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
          icon: MdSettingsBrightness,
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
          name: "Logout",
          icon: IoMdLogOut,
          links: [],
        },
       
      ];
  }
  