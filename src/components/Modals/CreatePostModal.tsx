import React, { useState } from "react";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";
import Image from "next/image";
import { TiArrowSortedDown } from "react-icons/ti";
import VisibilityPopup from "./CreatePostVisibilty";

interface CreatePostPopupProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({ setIsPopupOpen }) => {
  const [toggleVisibilityPopup, setToggleVisibilityPopup] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleVisibility = () => {
    setToggleVisibilityPopup((prev) => !prev); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-[50%] rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-semibold">Create a Post</h2>
          <button
            className="text-xl font-bold text-gray-600 hover:text-gray-800"
            onClick={closePopup}
          >
            &times;
          </button>
        </div>

        {/* Visibility Popup */}
        {toggleVisibilityPopup && (
          <VisibilityPopup
            toggleVisibilityPopup={() => setToggleVisibilityPopup(false)} // Pass function to close VisibilityPopup
          />
        )}

        <div className="p-4">
          <div className="flex items-center mb-4">
            <Image
              height={50}
              width={50}
              src="/logo.png"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium text-gray-800">LordLexxy</span>
            <p className="text-[13px] text-gray-500/50 flex items-center gap-2 ml-4">
              d
            </p>
            <TiArrowSortedDown onClick={toggleVisibility} />
          </div>

          <div className="w-full bg-gray-200 p-2 px-5 rounded-full flex items-center text-gray-500/70">
            Share whats on your mind, Alvin Marcos...
          </div>

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
              <BiBarChartSquare className="w-6 h-6 fill-black" />
            </span>
          </section>

          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
