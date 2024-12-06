import { GoGlobe } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";


export const FeedVisiblityMenu = [
    { name:"public",href: "", Icon: GoGlobe, label: "Public" },
    {name:"all-members", href: "", Icon: HiOutlineUserGroup, label: "All Members" },
    { name:"connections",href: "", Icon: HiOutlineUsers, label: "My Friends" },
    { name:"only-me",href: "", Icon: MdLockOutline, label: "Only Me" },
  ];
