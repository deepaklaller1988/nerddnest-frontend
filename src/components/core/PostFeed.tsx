"use client";
import dynamic from 'next/dynamic';

import React, { useRef, useState } from "react";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";
// import CreatePostPopup from "../Modals/CreatePostModal";
const CreatePostPopup = dynamic(() => import('../Modals/CreatePostModal'), { ssr: false });

import Image from "next/image";

export default function PostFeed() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
        >
          <CreatePostPopup setIsPopupOpen={setIsPopupOpen}/>
        </div>
      )}

      <div className="bg-[var(--sections)] border border-white/5 rounded-[12px] mt-3">
        <div className="w-full">
          <section className="flex gap-4 cursor-pointer p-4">
            <span className="min-w-12 min-h-12 max-w-12 max-h-12 rounded-full overflow-hidden block">
              <Image
                height={80}
                width={80}
                quality={20}
                className="w-full block h-full"
                src="/dp.jpg"
                alt="user"
              />
            </span>
            <div
              onClick={handleClick}
              className="w-full bg-[var(--bgh)] p-2 px-5 rounded-full flex items-center text-[var(--foreground)]"
            >
              Share whats on your mind, Alvin Marcos...
            </div>
          </section>
          <section className="border-t border-gray-500/10 p-4 flex gap-4">
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
              <BiBarChartSquare className="w-6 h-6 fill-white" />
            </span>
          </section>
        </div>
      </div>
    </>
  );
}
