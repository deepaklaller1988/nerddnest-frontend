import React from 'react'
import Link from 'next/link';
import { RiMessage2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { RiTimelineView } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrChatOption } from "react-icons/gr";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className='min-w-[280px] max-w-[280px] rounded-lg bg-white'>
        <h2 className='text-[var(--highlight)] font-semibold p-4'>WELCOME TO ACCOUNT</h2>
    <section>
        <div className='w-full'>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><CgProfile className='text-[16px]' /> Profile</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> View</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Edit</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Profile Photo</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Cover Photo</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><FaRegUser className='text-[16px]' /> Account</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Login Information</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Notification Settings</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Privacy</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Blocked Members</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Group Invites</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Export Data</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><RiTimelineView className='text-[16px]' /> Timeline</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><IoMdNotificationsOutline className='text-[16px]' /> Notifications</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Read</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Unread</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><RiMessage2Line className='text-[16px]' /> Messages</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Messages</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> New Message</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Site Notices</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><LuUsers className='text-[16px]' /> Connections</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Connections</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> No Pending Requests</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><HiOutlineUserGroup className='text-[16px]' /> Groups</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Groups</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> No Pending Invites</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Create Group</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><GrChatOption className='text-[16px]' /> Forums</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Discussions</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Replies</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Favorites</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><MdOutlinePhotoSizeSelectActual className='text-[16px]' /> Photos</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Photos</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> My Albums</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><MdOutlineMarkEmailRead className='text-[16px]' /> Email Invites</span></Link> <span className='p-4 cursor-pointer'><IoIosArrowDown className='text-[16px]' /></span></section>
                <section className='bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden'>
                    {/* max-h-[100vh] add remove on click arrow updown */}
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Send Invites</span></Link>
                    <Link href="" className='px-4 py-2 block'><span className='flex ietms-center gap-2 items-center'><IoMdArrowDropright /> Sent Invites</span></Link>
                </section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><IoDocumentTextOutline className='text-[16px]' /> My Documents</span></Link></section>
            </div>
            <div className='w-full'>
                <section className='hover:bg-gray-400/10 flex items-center justify-between'><Link href="" className='w-full block'><span className='flex items-center gap-2 p-3 pl-4 userHover'><MdLogout className='text-[16px]' /> Logout</span></Link></section>
            </div>
        </div>
    </section>
</div>
  )
}
