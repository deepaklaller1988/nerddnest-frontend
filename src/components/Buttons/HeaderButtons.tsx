"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
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
import HeaderModal from "../Modals/HeaderModal";

export default function HeaderButtons() {
  const [currentPopup, setCurrentPopup] = useState(null);

  const togglePopup = (type: any) => {
    setCurrentPopup((prev: any) => (prev === type ? null : type));
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        currentPopup &&
        !event.target.closest(`[data-popup-type="${currentPopup}"]`)
      ) {
        setCurrentPopup(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [currentPopup]);

  return (
    <section>
      <div className="flex gap-6">
        <div className="relative" data-popup-type="message">
          <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <RiMessage2Line
              className="text-[18px]"
              onClick={() => togglePopup("message")}
            />
          </button>

          {currentPopup == "message" && <HeaderModal type={currentPopup} />}
        </div>
        <div className="relative" data-popup-type="notification">
          <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <IoMdNotificationsOutline
              className="text-[20px]"
              onClick={() => togglePopup("notification")}
            />
          </button>

          {currentPopup == "notification" && (
            <HeaderModal type={currentPopup} />
          )}
        </div>
        <div className="relative" data-popup-type="sidebar">
          <button
            onClick={() => togglePopup("sidebar")}
            className="bg-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
              <img className="w-full block h-full" src="/logo.png" alt="logo" />
            </span>
            <b className="absolute bottom-0 right-0 bg-white rounded-full">
              <IoMdArrowDropdownCircle />
            </b>
          </button>

          {currentPopup == "sidebar" && (
            <div className="w-full min-w-[280px] overflow-y-auto overflow-x-hidden rounded-lg bg-white absolute right-0 mt-1 max-h-[500px]">
              <section className="sticky top-0 bg-white cursor-pointer flex gap-4 justify-between items-center p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
                <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                  <img
                    className="w-full block h-full"
                    src="/logo.png"
                    alt="logo"
                  />
                </span>
                <div className="w-full">
                  <b className="text-[var(--highlight)]">Ambros Marcos</b>
                </div>
              </section>
              <section>
                <div className="w-full">
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <CgProfile className="text-[16px]" /> Profile
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> View
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Edit
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Profile Photo
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Cover Photo
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <FaRegUser className="text-[16px]" /> Account
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Login Information
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Notification Settings
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Privacy
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Blocked Members
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Group Invites
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Export Data
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <RiTimelineView className="text-[16px]" /> Timeline
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <IoMdNotificationsOutline className="text-[16px]" />{" "}
                          Notifications
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Read
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Unread
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <RiMessage2Line className="text-[16px]" /> Messages
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Messages
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> New Message
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Site Notices
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <LuUsers className="text-[16px]" /> Connections
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Connections
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> No Pending Requests
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <HiOutlineUserGroup className="text-[16px]" /> Groups
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Groups
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> No Pending Invites
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Create Group
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <GrChatOption className="text-[16px]" /> Forums
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Discussions
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Replies
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Favorites
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <MdOutlinePhotoSizeSelectActual className="text-[16px]" />{" "}
                          Photos
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Photos
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> My Albums
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <MdOutlineMarkEmailRead className="text-[16px]" />{" "}
                          Email Invites
                        </span>
                      </Link>{" "}
                      <span className="p-4 cursor-pointer">
                        <IoIosArrowDown className="text-[16px]" />
                      </span>
                    </section>
                    <section className="bg-black/5 duration-[.5s] toggleclass max-h-0 overflow-hidden">
                      {/* max-h-[100vh] add remove on click arrow updown */}
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Send Invites
                        </span>
                      </Link>
                      <Link href="" className="px-4 py-2 block">
                        <span className="flex ietms-center gap-2 items-center">
                          <IoMdArrowDropright /> Sent Invites
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <IoDocumentTextOutline className="text-[16px]" /> My
                          Documents
                        </span>
                      </Link>
                    </section>
                  </div>
                  <div className="w-full">
                    <section className="hover:bg-gray-400/10 flex items-center justify-between">
                      <Link href="" className="w-full block">
                        <span className="flex items-center gap-2 p-3 pl-4 userHover">
                          <MdLogout className="text-[16px]" /> Logout
                        </span>
                      </Link>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
