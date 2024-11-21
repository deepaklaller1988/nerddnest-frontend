"use client";
import React, { useState } from "react";

import { GoGlobe } from "react-icons/go";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { RiUnpinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiNotificationOffLine } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";
import { MdOutlineModeComment } from "react-icons/md";
import { IoPaperPlaneSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import FeedSearchBar from "../SearchBar/FeedSearchBar";
import { FeedVisiblityMenu } from "../../lib/MenuBar/FeedVisibiltyMenu";
import { PostActionsMenu } from "../../lib/MenuBar/PostActionsMenu ";
import CommentSection from "./CommentSection";

export default function Feeds() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isCommentSectionVisible, setCommentSectionVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(FeedVisiblityMenu[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handleItemClick = (item: (typeof FeedVisiblityMenu)[number]) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="mt-4">
      <div className="-mb-3 w-full rounded-[12px] bg-gray-200 p-4 py-3 pb-6 flex items-center gap-4 justify-between">
        <section className="flex gap-10 cursor-pointer">
          <span className=" text-[var(--highlight)] border-b-2 border-[var(--highlight)]">
            All Updates
          </span>
          <span>Likes</span>
        </section>
        <FeedSearchBar />
      </div>
      <div className="w-full flex flex-col gap-4 mb-4">
        <section className="w-full bg-white rounded-[12px]">
          <section className="cursor-pointer flex items-start justify-between gap-4 p-4">
            <div className="flex items-start gap-2">
              <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                <Image
                  height={50}
                  width={50}
                  className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                  src="/logo.png"
                  alt="logo"
                />
              </span>
              <span className="w-full">
                <p>
                  <b className="text-[var(--highlight)] font-[600]">
                    Preety Marcos
                  </b>{" "}
                  Posted an update
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[13px] text-gray-500/50 flex items-center gap-2">
                    3 days ago <selectedItem.Icon />
                  </p>
                  <section className="relative">
                    <TiArrowSortedDown
                      onClick={() => setIsOpen((prev) => !prev)}
                    />
                    {isOpen && (
                      <>
                        <div className="shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[250px] py-2 rounded-lg bg-white absolute mt-1">
                          {FeedVisiblityMenu.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleItemClick(item)}
                              className={`${
                                selectedItem.label == item.label
                                  ? "drop bg-gray-500/10"
                                  : ""
                              } hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2 w-full text-left`}
                            >
                              <item.Icon /> {item.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </section>
                </div>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <LuPin className="w-4 h-4" />
              </span>
              <div className="flex relative">
                <span>
                  <MdMoreHoriz
                    className="w-6 h-6"
                    onClick={() => setIsOpenOptions((prev) => !prev)}
                  />
                </span>

                {isOpenOptions && (
                  <>
                    <div className="shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-white absolute mt-5 right-0">
                      {PostActionsMenu.map(({ href, icon, label }, index) => (
                        <Link
                          key={index}
                          href={href}
                          className={`flex gap-2 items-center px-4 py-2 hover:bg-gray-500/10 ${
                            hoveredIndex === index ? "drop" : ""
                          }`}
                          aria-label={label}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {icon} {label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          <div className="w-full px-4 flex flex-col gap-3">
            <section className="flex flex-col gap-3">
              <p>
                Welcome to <b>Nerdd Nest!</b> 🎮✨
              </p>

              <p>
                We’re thrilled to have you join our community of gamers,
                streamers, and creators from around the world! Whether you’re
                here to share epic moments, connect with friends, or explore the
                endless customization and networking options, this is your space
                to nest, create, and thrive.
              </p>

              <p>As you get started, don’t forget to set up…</p>
              <Link href="" className="text-[var(--highlight-blue)]">
                Read More
              </Link>
              <div className="w-full mt-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 cursor-pointer">
                  <span className="bg-blue-500 p-1 rounded-full">
                    <BiSolidLike className="fill-white" />
                  </span>{" "}
                  Marcos, Alvin and 2 Others
                </span>
                <span className="cursor-pointer hover:text-black/80">
                  3 Comments
                </span>
              </div>
              <div className="w-full border-t border-gray-500/20 py-4">
                <section className="w-full flex items-center gap-2 justify-between">
                  <Link
                    href=""
                    className="flex items-center gap-2 text-green-600"
                  >
                    {/* <BiLike className="w-5 h-5"/> */}
                    <BiSolidLike className="fill-green-600 w-5 h-5" /> Like
                  </Link>
                  <button className="flex items-center gap-2" onClick={() => setCommentSectionVisible((prev) => !prev)}>
                    <MdOutlineModeComment
                      className="w-5 h-5"
                      
                    />{" "}
                    Comment
                  </button>
                </section>
                {/* <div className="mt-3 border-t border-gray-500/20">
                  <div className="w-full py-4">
                    <div className="w-full">
                      <div className="flex items-start gap-2">
                        <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                          <img
                            className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                            src="/logo.png"
                            alt="logo"
                          />
                        </span>
                        <div className="max-w-full">
                          <div className="max-w-full mainReply">
                            <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                              <p>
                                <b className="text-[var(--highlight)] font-[600]">
                                  Preety Marcos
                                </b>
                              </p>
                              <p>
                                We’re thrilled to have you join our community of
                                gamers, streamers, and creators from around the
                                world! Whether you’re here to share epic
                                moments, connect with friends, or explore the
                                endless customization and networking options,
                                this is your space to nest, create, and thrive.
                              </p>
                            </span>
                            <div className="w-full flex items-center gap-3 mt-2">
                              <span className="cursor-pointer text-green-600 hover:underline">
                                Like
                              </span>
                              <span className="cursor-pointer hover:underline">
                                Reply
                              </span>
                              <span className="text-sm text-black/30">
                                1 day ago
                              </span>
                              <span className="bg-blue-500 p-1 rounded-full">
                                <BiSolidLike className="fill-white" />
                              </span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 mt-4 innerReply">
                            <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                              <img
                                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                                src="/logo.png"
                                alt="logo"
                              />
                            </span>
                            <div className="max-w-full">
                              <div className="max-w-full">
                                <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                                  <p>
                                    <b className="text-[var(--highlight)] font-[600]">
                                      Preety Marcos
                                    </b>
                                  </p>
                                  <p>Join our community.</p>
                                </span>
                                <div className="w-full flex items-center gap-3 mt-2">
                                  <span className="cursor-pointer text-green-600 hover:underline">
                                    Like
                                  </span>
                                  <span className="cursor-pointer hover:underline">
                                    Reply
                                  </span>
                                  <span className="text-sm text-black/30">
                                    1 day ago
                                  </span>
                                  <span className="bg-blue-500 p-1 rounded-full">
                                    <BiSolidLike className="fill-white" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                              <MdMoreHoriz className="w-6 h-6" />
                            </span>
                          </div>
                          <div className="flex items-start gap-2 mt-4 innerReply">
                            <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                              <img
                                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                                src="/logo.png"
                                alt="logo"
                              />
                            </span>
                            <div className="max-w-full">
                              <div className="max-w-full">
                                <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                                  <p>
                                    <b className="text-[var(--highlight)] font-[600]">
                                      Preety Marcos
                                    </b>
                                  </p>
                                  <p>We are best here for you to retest.</p>
                                </span>
                                <div className="w-full flex items-center gap-3 mt-2">
                                  <span className="cursor-pointer text-green-600 hover:underline">
                                    Like
                                  </span>
                                  <span className="cursor-pointer hover:underline">
                                    Reply
                                  </span>
                                  <span className="text-sm text-black/30">
                                    1 day ago
                                  </span>
                                  <span className="bg-blue-500 p-1 rounded-full">
                                    <BiSolidLike className="fill-white" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                              <MdMoreHoriz className="w-6 h-6" />
                            </span>
                          </div>
                          <div className="w-full">
                            <section className="flex gap-3 cursor-pointer py-4">
                              <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                                <img
                                  className="w-full block h-full"
                                  src="/dp.jpg"
                                  alt="user"
                                />
                              </span>
                              <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
                                <textarea
                                  className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                                  placeholder="Write a comment..."
                                ></textarea>
                                <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                                  <IoPaperPlaneSharp className="fill-white" />
                                </button>
                                <section className="p-4 pt-0 flex gap-4">
                                  <span className="cursor-pointer">
                                    <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <BiBarChartSquare className="w-6 h-6 fill-black" />
                                  </span>
                                </section>
                              </section>
                            </section>
                          </div>
                        </div>

                        <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                          <MdMoreHoriz className="w-6 h-6" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <section className="flex gap-3 cursor-pointer py-4">
                      <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                        <img
                          className="w-full block h-full"
                          src="/dp.jpg"
                          alt="user"
                        />
                      </span>
                      <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
                        <textarea
                          className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                          placeholder="Write a comment..."
                        ></textarea>
                        <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                          <IoPaperPlaneSharp className="fill-white" />
                        </button>
                        <section className="p-4 pt-0 flex gap-4">
                          <span className="cursor-pointer">
                            <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
                          </span>
                          <span className="cursor-pointer">
                            <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
                          </span>
                          <span className="cursor-pointer">
                            <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
                          </span>
                          <span className="cursor-pointer">
                            <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
                          </span>
                          <span className="cursor-pointer">
                            <BiBarChartSquare className="w-6 h-6 fill-black" />
                          </span>
                        </section>
                      </section>
                    </section>
                  </div>
                </div> */}

                {isCommentSectionVisible && <CommentSection />}
              </div>
            </section>
          </div>
        </section>
      </div>
      <div className="w-full flex flex-col gap-4 mb-4">
        <section className="w-full bg-white rounded-[12px]">
          <section className="cursor-pointer flex items-start justify-between gap-4 p-4">
            <div className="flex items-start gap-2">
              <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                <img
                  className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                  src="/logo.png"
                  alt="logo"
                />
              </span>
              <span className="w-full">
                <p>
                  <b className="text-[var(--highlight)] font-[600]">
                    Preety Marcos
                  </b>{" "}
                  Posted an update
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[13px] text-gray-500/50 flex items-center gap-2">
                    3 days ago <GoGlobe />
                  </p>
                  <section className="relative">
                    <TiArrowSortedDown />
                    <div className="hidden shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[250px] py-2 rounded-lg bg-white absolute mt-1">
                      <Link
                        href=""
                        className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                      >
                        <GoGlobe /> Public
                      </Link>
                      <Link
                        href=""
                        className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                      >
                        <HiOutlineUserGroup /> All Members
                      </Link>
                      <Link
                        href=""
                        className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                      >
                        <HiOutlineUsers /> My Connections
                      </Link>
                      <Link
                        href=""
                        className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                      >
                        <MdLockOutline /> Only Me
                      </Link>
                    </div>
                  </section>
                </div>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                <LuPin className="w-4 h-4" />
              </span>
              <div className="flex relative">
                <span>
                  <MdMoreHoriz className="w-6 h-6" />
                </span>
                <div className="hidden shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-white absolute mt-5 right-0">
                  <Link
                    href=""
                    className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                  >
                    <FaRegEdit /> Edit
                  </Link>
                  <Link
                    href=""
                    className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                  >
                    <RiDeleteBin7Line /> Delete
                  </Link>
                  <Link
                    href=""
                    className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                  >
                    <MdOutlineCommentsDisabled /> Turn off commenting
                  </Link>
                  <Link
                    href=""
                    className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                  >
                    <RiUnpinLine /> Unpin from Feed
                  </Link>
                  <Link
                    href=""
                    className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
                  >
                    <RiNotificationOffLine /> Turn off notifications
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="w-full px-4 flex flex-col gap-3">
            <section className="flex flex-col gap-3">
              <p>
                Welcome to <b>Nerdd Nest!</b> 🎮✨
              </p>

              <p>
                We’re thrilled to have you join our community of gamers,
                streamers, and creators from around the world! Whether you’re
                here to share epic moments, connect with friends, or explore the
                endless customization and networking options, this is your space
                to nest, create, and thrive.
              </p>
              <Link href="" className="text-[var(--highlight-blue)]">
                Read More
              </Link>
              <img src="/newBack.jpg" className="block w-full" alt="" />
              <div className="w-full mt-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 cursor-pointer">
                  <span className="bg-blue-500 p-1 rounded-full">
                    <BiSolidLike className="fill-white" />
                  </span>{" "}
                  Marcos, Alvin and 2 Others
                </span>
                <span className="cursor-pointer hover:text-black/80">
                  3 Comments
                </span>
              </div>
              <div className="w-full border-t border-gray-500/20 py-4">
                <section className="w-full flex items-center gap-2 justify-between">
                  <Link
                    href=""
                    className="flex items-center gap-2 text-green-600"
                  >
                    {/* <BiLike className="w-5 h-5"/> */}
                    <BiSolidLike className="fill-green-600 w-5 h-5" /> Like
                  </Link>
                  <Link href="" className="flex items-center gap-2">
                    <MdOutlineModeComment className="w-5 h-5" /> Comment
                  </Link>
                </section>
                <div className="mt-3 border-t border-gray-500/20">
                  <div className="w-full py-4">
                    <div className="w-full">
                      <div className="flex items-start gap-2">
                        <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                          <img
                            className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                            src="/logo.png"
                            alt="logo"
                          />
                        </span>
                        <div className="max-w-full">
                          <div className="max-w-full mainReply">
                            <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                              <p>
                                <b className="text-[var(--highlight)] font-[600]">
                                  Preety Marcos
                                </b>
                              </p>
                              <p>
                                We’re thrilled to have you join our community of
                                gamers, streamers, and creators from around the
                                world! Whether you’re here to share epic
                                moments, connect with friends, or explore the
                                endless customization and networking options,
                                this is your space to nest, create, and thrive.
                              </p>
                            </span>
                            <div className="w-full flex items-center gap-3 mt-2">
                              <span className="cursor-pointer text-green-600 hover:underline">
                                Like
                              </span>
                              <span className="cursor-pointer hover:underline">
                                Reply
                              </span>
                              <span className="text-sm text-black/30">
                                1 day ago
                              </span>
                              <span className="bg-blue-500 p-1 rounded-full">
                                <BiSolidLike className="fill-white" />
                              </span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 mt-4 innerReply">
                            <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                              <img
                                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                                src="/logo.png"
                                alt="logo"
                              />
                            </span>
                            <div className="max-w-full">
                              <div className="max-w-full">
                                <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                                  <p>
                                    <b className="text-[var(--highlight)] font-[600]">
                                      Preety Marcos
                                    </b>
                                  </p>
                                  <p>Join our community.</p>
                                </span>
                                <div className="w-full flex items-center gap-3 mt-2">
                                  <span className="cursor-pointer text-green-600 hover:underline">
                                    Like
                                  </span>
                                  <span className="cursor-pointer hover:underline">
                                    Reply
                                  </span>
                                  <span className="text-sm text-black/30">
                                    1 day ago
                                  </span>
                                  <span className="bg-blue-500 p-1 rounded-full">
                                    <BiSolidLike className="fill-white" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                              <MdMoreHoriz className="w-6 h-6" />
                            </span>
                          </div>
                          <div className="flex items-start gap-2 mt-4 innerReply">
                            <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                              <img
                                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                                src="/logo.png"
                                alt="logo"
                              />
                            </span>
                            <div className="max-w-full">
                              <div className="max-w-full">
                                <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                                  <p>
                                    <b className="text-[var(--highlight)] font-[600]">
                                      Preety Marcos
                                    </b>
                                  </p>
                                  <p>We are best here for you to retest.</p>
                                </span>
                                <div className="w-full flex items-center gap-3 mt-2">
                                  <span className="cursor-pointer text-green-600 hover:underline">
                                    Like
                                  </span>
                                  <span className="cursor-pointer hover:underline">
                                    Reply
                                  </span>
                                  <span className="text-sm text-black/30">
                                    1 day ago
                                  </span>
                                  <span className="bg-blue-500 p-1 rounded-full">
                                    <BiSolidLike className="fill-white" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                              <MdMoreHoriz className="w-6 h-6" />
                            </span>
                          </div>
                          <div className="w-full">
                            <section className="flex gap-3 cursor-pointer py-4">
                              <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                                <img
                                  className="w-full block h-full"
                                  src="/dp.jpg"
                                  alt="user"
                                />
                              </span>
                              <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
                                <textarea
                                  className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                                  placeholder="Write a comment..."
                                ></textarea>
                                <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                                  <IoPaperPlaneSharp className="fill-white" />
                                </button>
                                <section className="p-4 pt-0 flex gap-4">
                                  <span className="cursor-pointer">
                                    <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
                                  </span>
                                  <span className="cursor-pointer">
                                    <BiBarChartSquare className="w-6 h-6 fill-black" />
                                  </span>
                                </section>
                              </section>
                            </section>
                          </div>
                        </div>

                        <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                          <MdMoreHoriz className="w-6 h-6" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <section className="flex gap-3 cursor-pointer py-4">
                      <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                        <img
                          className="w-full block h-full"
                          src="/dp.jpg"
                          alt="user"
                        />
                      </span>
                      <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
                        <textarea
                          className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                          placeholder="Write a comment..."
                        ></textarea>
                        <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                          <IoPaperPlaneSharp className="fill-white" />
                        </button>
                        <section className="p-4 pt-0 flex gap-4">
                          <span className="cursor-pointer">
                            <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
                          </span>
                          <span className="cursor-pointer">
                            <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
                          </span>
                          <span className="cursor-pointer">
                            <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
                          </span>
                          <span className="cursor-pointer">
                            <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
                          </span>
                          <span className="cursor-pointer">
                            <BiBarChartSquare className="w-6 h-6 fill-black" />
                          </span>
                        </section>
                      </section>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";

// import { GoGlobe } from "react-icons/go";
// import { TiArrowSortedDown } from "react-icons/ti";
// import { MdMoreHoriz } from "react-icons/md";
// import { LuPin } from "react-icons/lu";
// import { MdLockOutline } from "react-icons/md";
// import { HiOutlineUserGroup } from "react-icons/hi2";
// import { HiOutlineUsers } from "react-icons/hi2";
// import { RiDeleteBin7Line } from "react-icons/ri";
// import { MdOutlineCommentsDisabled } from "react-icons/md";
// import { RiUnpinLine } from "react-icons/ri";
// import { FaRegEdit } from "react-icons/fa";
// import { RiNotificationOffLine } from "react-icons/ri";
// import { BiSolidLike } from "react-icons/bi";
// import { MdOutlineLinkedCamera } from "react-icons/md";
// import { HiOutlineVideoCamera } from "react-icons/hi2";
// import { IoDocumentAttachOutline } from "react-icons/io5";
// import { HiOutlineGif } from "react-icons/hi2";
// import { BiBarChartSquare } from "react-icons/bi";
// import { MdOutlineModeComment } from "react-icons/md";
// import { IoPaperPlaneSharp } from "react-icons/io5";
// import Link from "next/link";
// import Image from "next/image";
// import FeedSearchBar from "../SearchBar/FeedSearchBar";

// export default function Feeds() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="mt-4">
//       <div className="-mb-3 w-full rounded-[12px] bg-gray-200 p-4 py-3 pb-6 flex items-center gap-4 justify-between">
//         <section className="flex gap-10 cursor-pointer">
//           <span className=" text-[var(--highlight)] border-b-2 border-[var(--highlight)]">
//             All Updates
//           </span>
//           <span>Likes</span>
//         </section>
//         <FeedSearchBar />
//       </div>
//       <div className="w-full flex flex-col gap-4 mb-4">
//         <section className="w-full bg-white rounded-[12px]">
//           <section className="cursor-pointer flex items-start justify-between gap-4 p-4">
//             <div className="flex items-start gap-2">
//               <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                 <Image
//                   height={50}
//                   width={50}
//                   className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                   src="/logo.png"
//                   alt="logo"
//                 />
//               </span>
//               <span className="w-full">
//                 <p>
//                   <b className="text-[var(--highlight)] font-[600]">
//                     Preety Marcos
//                   </b>{" "}
//                   Posted an update
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <p className="text-[13px] text-gray-500/50 flex items-center gap-2">
//                     3 days ago <GoGlobe />
//                   </p>
//                   <section className="relative">
//                     <TiArrowSortedDown
//                       onClick={() => setIsOpen((prev) => !prev)}
//                     />
//                     <div
//                       className={`${
//                         isOpen ? "block" : "hidden"
//                       } shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[250px] py-2 rounded-lg bg-white absolute mt-1`}
//                     >
//                       {" "}
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <GoGlobe /> Public
//                       </Link>
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <HiOutlineUserGroup /> All Members
//                       </Link>
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <HiOutlineUsers /> My Connections
//                       </Link>
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <MdLockOutline /> Only Me
//                       </Link>
//                     </div>
//                   </section>
//                 </div>
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span>
//                 <LuPin className="w-4 h-4" />
//               </span>
//               <div className="flex relative">
//                 <span>
//                   <MdMoreHoriz className="w-6 h-6" />
//                 </span>
//                 <div className="hidden shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-white absolute mt-5 right-0">
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <FaRegEdit /> Edit
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <RiDeleteBin7Line /> Delete
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <MdOutlineCommentsDisabled /> Turn off commenting
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <RiUnpinLine /> Unpin from Feed
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <RiNotificationOffLine /> Turn off notifications
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <div className="w-full px-4 flex flex-col gap-3">
//             <section className="flex flex-col gap-3">
//               <p>
//                 Welcome to <b>Nerdd Nest!</b> 🎮✨
//               </p>

//               <p>
//                 We’re thrilled to have you join our community of gamers,
//                 streamers, and creators from around the world! Whether you’re
//                 here to share epic moments, connect with friends, or explore the
//                 endless customization and networking options, this is your space
//                 to nest, create, and thrive.
//               </p>

//               <p>As you get started, don’t forget to set up…</p>
//               <Link href="" className="text-[var(--highlight-blue)]">
//                 Read More
//               </Link>
//               <div className="w-full mt-2 flex items-center justify-between gap-2">
//                 <span className="inline-flex items-center gap-2 cursor-pointer">
//                   <span className="bg-blue-500 p-1 rounded-full">
//                     <BiSolidLike className="fill-white" />
//                   </span>{" "}
//                   Marcos, Alvin and 2 Others
//                 </span>
//                 <span className="cursor-pointer hover:text-black/80">
//                   3 Comments
//                 </span>
//               </div>
//               <div className="w-full border-t border-gray-500/20 py-4">
//                 <section className="w-full flex items-center gap-2 justify-between">
//                   <Link
//                     href=""
//                     className="flex items-center gap-2 text-green-600"
//                   >
//                     {/* <BiLike className="w-5 h-5"/> */}
//                     <BiSolidLike className="fill-green-600 w-5 h-5" /> Like
//                   </Link>
//                   <Link href="" className="flex items-center gap-2">
//                     <MdOutlineModeComment className="w-5 h-5" /> Comment
//                   </Link>
//                 </section>
//                 <div className="mt-3 border-t border-gray-500/20">
//                   <div className="w-full py-4">
//                     <div className="w-full">
//                       <div className="flex items-start gap-2">
//                         <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                           <img
//                             className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                             src="/logo.png"
//                             alt="logo"
//                           />
//                         </span>
//                         <div className="max-w-full">
//                           <div className="max-w-full mainReply">
//                             <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
//                               <p>
//                                 <b className="text-[var(--highlight)] font-[600]">
//                                   Preety Marcos
//                                 </b>
//                               </p>
//                               <p>
//                                 We’re thrilled to have you join our community of
//                                 gamers, streamers, and creators from around the
//                                 world! Whether you’re here to share epic
//                                 moments, connect with friends, or explore the
//                                 endless customization and networking options,
//                                 this is your space to nest, create, and thrive.
//                               </p>
//                             </span>
//                             <div className="w-full flex items-center gap-3 mt-2">
//                               <span className="cursor-pointer text-green-600 hover:underline">
//                                 Like
//                               </span>
//                               <span className="cursor-pointer hover:underline">
//                                 Reply
//                               </span>
//                               <span className="text-sm text-black/30">
//                                 1 day ago
//                               </span>
//                               <span className="bg-blue-500 p-1 rounded-full">
//                                 <BiSolidLike className="fill-white" />
//                               </span>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-2 mt-4 innerReply">
//                             <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                               <img
//                                 className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                                 src="/logo.png"
//                                 alt="logo"
//                               />
//                             </span>
//                             <div className="max-w-full">
//                               <div className="max-w-full">
//                                 <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
//                                   <p>
//                                     <b className="text-[var(--highlight)] font-[600]">
//                                       Preety Marcos
//                                     </b>
//                                   </p>
//                                   <p>Join our community.</p>
//                                 </span>
//                                 <div className="w-full flex items-center gap-3 mt-2">
//                                   <span className="cursor-pointer text-green-600 hover:underline">
//                                     Like
//                                   </span>
//                                   <span className="cursor-pointer hover:underline">
//                                     Reply
//                                   </span>
//                                   <span className="text-sm text-black/30">
//                                     1 day ago
//                                   </span>
//                                   <span className="bg-blue-500 p-1 rounded-full">
//                                     <BiSolidLike className="fill-white" />
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
//                               <MdMoreHoriz className="w-6 h-6" />
//                             </span>
//                           </div>
//                           <div className="flex items-start gap-2 mt-4 innerReply">
//                             <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                               <img
//                                 className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                                 src="/logo.png"
//                                 alt="logo"
//                               />
//                             </span>
//                             <div className="max-w-full">
//                               <div className="max-w-full">
//                                 <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
//                                   <p>
//                                     <b className="text-[var(--highlight)] font-[600]">
//                                       Preety Marcos
//                                     </b>
//                                   </p>
//                                   <p>We are best here for you to retest.</p>
//                                 </span>
//                                 <div className="w-full flex items-center gap-3 mt-2">
//                                   <span className="cursor-pointer text-green-600 hover:underline">
//                                     Like
//                                   </span>
//                                   <span className="cursor-pointer hover:underline">
//                                     Reply
//                                   </span>
//                                   <span className="text-sm text-black/30">
//                                     1 day ago
//                                   </span>
//                                   <span className="bg-blue-500 p-1 rounded-full">
//                                     <BiSolidLike className="fill-white" />
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
//                               <MdMoreHoriz className="w-6 h-6" />
//                             </span>
//                           </div>
//                           <div className="w-full">
//                             <section className="flex gap-3 cursor-pointer py-4">
//                               <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
//                                 <img
//                                   className="w-full block h-full"
//                                   src="/dp.jpg"
//                                   alt="user"
//                                 />
//                               </span>
//                               <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
//                                 <textarea
//                                   className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
//                                   placeholder="Write a comment..."
//                                 ></textarea>
//                                 <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
//                                   <IoPaperPlaneSharp className="fill-white" />
//                                 </button>
//                                 <section className="p-4 pt-0 flex gap-4">
//                                   <span className="cursor-pointer">
//                                     <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <BiBarChartSquare className="w-6 h-6 fill-black" />
//                                   </span>
//                                 </section>
//                               </section>
//                             </section>
//                           </div>
//                         </div>

//                         <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
//                           <MdMoreHoriz className="w-6 h-6" />
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="w-full">
//                     <section className="flex gap-3 cursor-pointer py-4">
//                       <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
//                         <img
//                           className="w-full block h-full"
//                           src="/dp.jpg"
//                           alt="user"
//                         />
//                       </span>
//                       <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
//                         <textarea
//                           className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
//                           placeholder="Write a comment..."
//                         ></textarea>
//                         <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
//                           <IoPaperPlaneSharp className="fill-white" />
//                         </button>
//                         <section className="p-4 pt-0 flex gap-4">
//                           <span className="cursor-pointer">
//                             <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <BiBarChartSquare className="w-6 h-6 fill-black" />
//                           </span>
//                         </section>
//                       </section>
//                     </section>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </section>
//       </div>
//       <div className="w-full flex flex-col gap-4 mb-4">
//         <section className="w-full bg-white rounded-[12px]">
//           <section className="cursor-pointer flex items-start justify-between gap-4 p-4">
//             <div className="flex items-start gap-2">
//               <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                 <img
//                   className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                   src="/logo.png"
//                   alt="logo"
//                 />
//               </span>
//               <span className="w-full">
//                 <p>
//                   <b className="text-[var(--highlight)] font-[600]">
//                     Preety Marcos
//                   </b>{" "}
//                   Posted an update
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <p className="text-[13px] text-gray-500/50 flex items-center gap-2">
//                     3 days ago <GoGlobe />
//                   </p>
//                   <section className="relative">
//                     <TiArrowSortedDown />
//                     <div className="hidden shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[250px] py-2 rounded-lg bg-white absolute mt-1">
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <GoGlobe /> Public
//                       </Link>
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <HiOutlineUserGroup /> All Members
//                       </Link>
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <HiOutlineUsers /> My Connections
//                       </Link>
//                       <Link
//                         href=""
//                         className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                       >
//                         <MdLockOutline /> Only Me
//                       </Link>
//                     </div>
//                   </section>
//                 </div>
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span>
//                 <LuPin className="w-4 h-4" />
//               </span>
//               <div className="flex relative">
//                 <span>
//                   <MdMoreHoriz className="w-6 h-6" />
//                 </span>
//                 <div className="hidden shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-white absolute mt-5 right-0">
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <FaRegEdit /> Edit
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <RiDeleteBin7Line /> Delete
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <MdOutlineCommentsDisabled /> Turn off commenting
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <RiUnpinLine /> Unpin from Feed
//                   </Link>
//                   <Link
//                     href=""
//                     className="hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2"
//                   >
//                     <RiNotificationOffLine /> Turn off notifications
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <div className="w-full px-4 flex flex-col gap-3">
//             <section className="flex flex-col gap-3">
//               <p>
//                 Welcome to <b>Nerdd Nest!</b> 🎮✨
//               </p>

//               <p>
//                 We’re thrilled to have you join our community of gamers,
//                 streamers, and creators from around the world! Whether you’re
//                 here to share epic moments, connect with friends, or explore the
//                 endless customization and networking options, this is your space
//                 to nest, create, and thrive.
//               </p>
//               <Link href="" className="text-[var(--highlight-blue)]">
//                 Read More
//               </Link>
//               <img src="/newBack.jpg" className="block w-full" alt="" />
//               <div className="w-full mt-2 flex items-center justify-between gap-2">
//                 <span className="inline-flex items-center gap-2 cursor-pointer">
//                   <span className="bg-blue-500 p-1 rounded-full">
//                     <BiSolidLike className="fill-white" />
//                   </span>{" "}
//                   Marcos, Alvin and 2 Others
//                 </span>
//                 <span className="cursor-pointer hover:text-black/80">
//                   3 Comments
//                 </span>
//               </div>
//               <div className="w-full border-t border-gray-500/20 py-4">
//                 <section className="w-full flex items-center gap-2 justify-between">
//                   <Link
//                     href=""
//                     className="flex items-center gap-2 text-green-600"
//                   >
//                     {/* <BiLike className="w-5 h-5"/> */}
//                     <BiSolidLike className="fill-green-600 w-5 h-5" /> Like
//                   </Link>
//                   <Link href="" className="flex items-center gap-2">
//                     <MdOutlineModeComment className="w-5 h-5" /> Comment
//                   </Link>
//                 </section>
//                 <div className="mt-3 border-t border-gray-500/20">
//                   <div className="w-full py-4">
//                     <div className="w-full">
//                       <div className="flex items-start gap-2">
//                         <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                           <img
//                             className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                             src="/logo.png"
//                             alt="logo"
//                           />
//                         </span>
//                         <div className="max-w-full">
//                           <div className="max-w-full mainReply">
//                             <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
//                               <p>
//                                 <b className="text-[var(--highlight)] font-[600]">
//                                   Preety Marcos
//                                 </b>
//                               </p>
//                               <p>
//                                 We’re thrilled to have you join our community of
//                                 gamers, streamers, and creators from around the
//                                 world! Whether you’re here to share epic
//                                 moments, connect with friends, or explore the
//                                 endless customization and networking options,
//                                 this is your space to nest, create, and thrive.
//                               </p>
//                             </span>
//                             <div className="w-full flex items-center gap-3 mt-2">
//                               <span className="cursor-pointer text-green-600 hover:underline">
//                                 Like
//                               </span>
//                               <span className="cursor-pointer hover:underline">
//                                 Reply
//                               </span>
//                               <span className="text-sm text-black/30">
//                                 1 day ago
//                               </span>
//                               <span className="bg-blue-500 p-1 rounded-full">
//                                 <BiSolidLike className="fill-white" />
//                               </span>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-2 mt-4 innerReply">
//                             <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                               <img
//                                 className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                                 src="/logo.png"
//                                 alt="logo"
//                               />
//                             </span>
//                             <div className="max-w-full">
//                               <div className="max-w-full">
//                                 <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
//                                   <p>
//                                     <b className="text-[var(--highlight)] font-[600]">
//                                       Preety Marcos
//                                     </b>
//                                   </p>
//                                   <p>Join our community.</p>
//                                 </span>
//                                 <div className="w-full flex items-center gap-3 mt-2">
//                                   <span className="cursor-pointer text-green-600 hover:underline">
//                                     Like
//                                   </span>
//                                   <span className="cursor-pointer hover:underline">
//                                     Reply
//                                   </span>
//                                   <span className="text-sm text-black/30">
//                                     1 day ago
//                                   </span>
//                                   <span className="bg-blue-500 p-1 rounded-full">
//                                     <BiSolidLike className="fill-white" />
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
//                               <MdMoreHoriz className="w-6 h-6" />
//                             </span>
//                           </div>
//                           <div className="flex items-start gap-2 mt-4 innerReply">
//                             <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
//                               <img
//                                 className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
//                                 src="/logo.png"
//                                 alt="logo"
//                               />
//                             </span>
//                             <div className="max-w-full">
//                               <div className="max-w-full">
//                                 <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
//                                   <p>
//                                     <b className="text-[var(--highlight)] font-[600]">
//                                       Preety Marcos
//                                     </b>
//                                   </p>
//                                   <p>We are best here for you to retest.</p>
//                                 </span>
//                                 <div className="w-full flex items-center gap-3 mt-2">
//                                   <span className="cursor-pointer text-green-600 hover:underline">
//                                     Like
//                                   </span>
//                                   <span className="cursor-pointer hover:underline">
//                                     Reply
//                                   </span>
//                                   <span className="text-sm text-black/30">
//                                     1 day ago
//                                   </span>
//                                   <span className="bg-blue-500 p-1 rounded-full">
//                                     <BiSolidLike className="fill-white" />
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
//                               <MdMoreHoriz className="w-6 h-6" />
//                             </span>
//                           </div>
//                           <div className="w-full">
//                             <section className="flex gap-3 cursor-pointer py-4">
//                               <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
//                                 <img
//                                   className="w-full block h-full"
//                                   src="/dp.jpg"
//                                   alt="user"
//                                 />
//                               </span>
//                               <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
//                                 <textarea
//                                   className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
//                                   placeholder="Write a comment..."
//                                 ></textarea>
//                                 <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
//                                   <IoPaperPlaneSharp className="fill-white" />
//                                 </button>
//                                 <section className="p-4 pt-0 flex gap-4">
//                                   <span className="cursor-pointer">
//                                     <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
//                                   </span>
//                                   <span className="cursor-pointer">
//                                     <BiBarChartSquare className="w-6 h-6 fill-black" />
//                                   </span>
//                                 </section>
//                               </section>
//                             </section>
//                           </div>
//                         </div>

//                         <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
//                           <MdMoreHoriz className="w-6 h-6" />
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="w-full">
//                     <section className="flex gap-3 cursor-pointer py-4">
//                       <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
//                         <img
//                           className="w-full block h-full"
//                           src="/dp.jpg"
//                           alt="user"
//                         />
//                       </span>
//                       <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
//                         <textarea
//                           className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
//                           placeholder="Write a comment..."
//                         ></textarea>
//                         <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
//                           <IoPaperPlaneSharp className="fill-white" />
//                         </button>
//                         <section className="p-4 pt-0 flex gap-4">
//                           <span className="cursor-pointer">
//                             <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
//                           </span>
//                           <span className="cursor-pointer">
//                             <BiBarChartSquare className="w-6 h-6 fill-black" />
//                           </span>
//                         </section>
//                       </section>
//                     </section>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
