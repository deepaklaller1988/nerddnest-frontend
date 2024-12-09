"use client";
import dynamic from 'next/dynamic';

import React, { useRef, useState } from "react";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";
const CreatePostPopup = dynamic(() => import('../Modals/CreatePostModal'), { ssr: false });

import Image from "next/image";
import { capitalizeName } from '@/utils/capitalizeName';
import { useSelector } from 'react-redux';

export default function PostFeed() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const firstName = useSelector((state: any) => state.auth.firstName);
  const lastName = useSelector((state: any) => state.auth.lastName);

  const handleClick = (type: string) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  return (
    <>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
        >
          <CreatePostPopup setIsPopupOpen={setIsPopupOpen} type={popupType} setPopupType={setPopupType}/>
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
                // src="/dp.jpg"
                src="/profile-avatar-legacy-50.png"

                alt="user"
              />
            </span>
            <div
              onClick={() => handleClick("text")}
              className="w-full bg-[var(--bgh)] p-2 px-5 rounded-full flex items-center text-[var(--foreground)]"
            >
              {`Share what's on your mind, ${capitalizeName(firstName || '')} ${capitalizeName(lastName || '')} ...` }

            </div>
          </section>
          <section className="border-t border-gray-500/10 p-4 flex gap-4">
            <span className="cursor-pointer" onClick={() => handleClick('image')}>
              <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
            </span>
            <span className="cursor-pointer" onClick={() => handleClick('video')}>
              <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
            </span>
            <span className="cursor-pointer" onClick={() => handleClick('document')}>
              <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
            </span>
            <span className="cursor-pointer" onClick={() => handleClick('gif')}>
              <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
            </span>
            <span className="cursor-pointer">
              <BiBarChartSquare className="w-6 h-6 fill-white" onClick={() => handleClick('poll')}/>
            </span>
          </section>
        </div>
      </div>
    </>
  );
}
