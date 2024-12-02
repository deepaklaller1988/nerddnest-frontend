import React, { useState } from "react";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import VisibilityPopup from "./CreatePostVisibilty";
import SchedulePostPopup from "./SchedulePostModal";
import QuillEditor from "../core/QuillEditor";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { GoGlobe } from "react-icons/go";
import PopupHeader from "../Header/PopupHeader";
import { PiClockFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa6";

interface CreatePostPopupProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({
  setIsPopupOpen,
}) => {
  const [toggleVisibilityPopup, setToggleVisibilityPopup] = useState(false);
  const [isSchedulePopupOpen, setSchedulePopupOpen] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [value, setValue] = useState<any>('');

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleVisibility = () => {
    setToggleVisibilityPopup((prev) => !prev);
  };

  const handleEmojis = () => {
    setEmoji((prev) => !prev);
  };

  // const handleEmojiSelect = (emoji: any) => {
  //   const quillEditor :any= typeof window !== 'undefined' && document.querySelector(".ql-editor") as HTMLElement;
  //   const currentText = quillEditor.innerHTML;
  //   setValue(currentText + emoji.emoji);  
  // };
  const handleEmojiSelect = (emoji: any) => {
    if (typeof window !== 'undefined') {
      const quillEditor = document.querySelector(".ql-editor") as HTMLElement;
      if (quillEditor) {
        const currentText = quillEditor.innerHTML;
        setValue(currentText + emoji.emoji);
      }
    }
  };
  

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-lg">
          <PopupHeader title={" Create a Post"} onClick={closePopup} />
          <div className="p-4">
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-800">LordLexxy</span>
              <p className="text-[13px] text-gray-500/50 flex items-center gap-2 ml-4">
                <GoGlobe />
              </p>
              <TiArrowSortedDown onClick={toggleVisibility} />
            </div>
            <div className="w-full">
              <div className="flex flex-col">
                <div className="!z-1">
                  <QuillEditor value={value} setValue={setValue} />
                </div>
                <div className="my-2 relative">
                  <button onClick={handleEmojis}>
                    <BsEmojiSmile className="w-6 h-6"  />
                  </button>
                  {emoji && (
                    <EmojiPicker className="max-w-[300px] max-h-[350px] !absolute right-0 top-[50%] translate-y-[-50%]" onEmojiClick={handleEmojiSelect}
                    searchDisabled
                    autoFocusSearch
                     />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
            <div>
            <section className="border-t border-gray-500/10 p-4 flex gap-4 ">
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
            </div>         
          <div className="flex items-center gap-1">
          <button
              onClick={() => setSchedulePopupOpen(true)}
              className="bg-slate-300 hover:bg-blue-200 text-white px-2 py-2 rounded-md flex items-center gap-1">
              {/* Open Schedule Post Popup */}
              <span><PiClockFill size={20} /></span><span><FaCaretDown size={15} /></span>
            </button>{" "}
            <button className="bg-[var(--highlght-hover)] text-white rounded-md  px-3 py-2 ">
              Post
            </button>
          </div>
           </div>
          </div>
          <SchedulePostPopup
            isOpen={isSchedulePopupOpen}
            onClose={() => setSchedulePopupOpen(false)}
          />
        </div>
      </div>

      {toggleVisibilityPopup && (
        <VisibilityPopup
          toggleVisibilityPopup={() => setToggleVisibilityPopup(false)}
          groups={["Support"]}
        />
      )}
    </>
  );
};

export default CreatePostPopup;