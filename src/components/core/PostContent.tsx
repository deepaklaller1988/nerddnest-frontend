import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdMoreHoriz } from "react-icons/md";
import { LuPin } from "react-icons/lu";
import { BiSolidLike } from "react-icons/bi";
import Link from "next/link";
import { FeedVisiblityMenu } from "@/lib/MenuBar/FeedVisibiltyMenu";
import { PostActionsMenu } from "@/lib/MenuBar/PostActionsMenu ";
import CommentSection from "./CommentSection";
import DeletePopup from "../Modals/DeleteConfirmation";

export default function PostContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(FeedVisiblityMenu[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);
  const [isCommentingEnabled, setIsCommentingEnabled] = useState(true);

  const handleItemClick = (item: (typeof FeedVisiblityMenu)[number]) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
  };
  const handleToggleCommenting = () => {
    setIsCommentingEnabled(!isCommentingEnabled);
  };
  const handleTogglePin = () => setIsPinned((prev) => !prev);
  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-4">
        {isDeletePopupOpen && (
          <>
            <DeletePopup
              message={"Are you sure want to Delete"}
              onDelete={handleDeleteClick}
              onCancel={handleClosePopup}
            />
          </>
        )}
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
                  </b>
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
                {isPinned ? (
                  ""
                ) : (
                  <LuPin
                    className="w-4 h-4 cursor-pointer"
                    onClick={handleTogglePin}
                  />
                )}
              </span>

              <div className="flex relative">
                <span>
                  <MdMoreHoriz
                    className="w-6 h-6"
                    onClick={() => setIsOpenOptions((prev) => !prev)}
                  />
                </span>

                {isOpenOptions && (
                  <div className="shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-white absolute mt-5 right-0">
                    {PostActionsMenu({
                      isPinned,
                      togglePin: handleTogglePin,
                      isCommentingEnabled,
                      toggleCommenting: handleToggleCommenting,
                    }).map(({ icon, label, onClick }, index) => (
                      <button
                        key={index}
                        className={`flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none ${
                          hoveredIndex === index ? "drop" : ""
                        }`}
                        aria-label={label}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={onClick}
                      >
                        {icon} {label}
                      </button>
                    ))}
                  </div>
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
              <CommentSection />
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
