import React, { useEffect, useRef, useState } from "react";
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
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import GifSearch from "../core/GifSearch";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationPostSchema } from "@/utils/validationSchemas";
import { toasterInfo } from "../core/Toaster";
import { RxCross2 } from "react-icons/rx";

interface CreatePostPopupProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({
  setIsPopupOpen,
}) => {
  const ImageInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [toggleVisibilityPopup, setToggleVisibilityPopup] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null
  );
  const [selectedName, setSelectedName] = useState("");

  const [isSchedulePopupOpen, setSchedulePopupOpen] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [value, setValue] = useState<any>("");

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleVisibility = () => {
    setToggleVisibilityPopup((prev) => !prev);
  };
  const handleSelectedIcon = (icon: React.ReactNode) => {
    setSelectedIcon(icon);
  };
  const handleEmojis = () => {
    setEmoji((prev) => !prev);
  };

  const handleEmojiSelect = (emoji: any) => {
    if (typeof window !== "undefined") {
      const quillEditor = document.querySelector(".ql-editor") as HTMLElement;
      if (quillEditor) {
        const currentText = quillEditor.innerHTML;
        setValue(currentText + emoji.emoji);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setEmoji(false);
      }
    };

    if (emoji) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emoji]);

  const handleOnClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const name = e.currentTarget.getAttribute("name");
    if (name) {
      setSelectedName(name);
    }
    if (name === "camera") {
      ImageInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      if (images.length + newFiles.length <= 10) {
        setImages((prevFiles) => [...prevFiles, ...newFiles]);
      } else {
        toasterInfo(
          "Unable to upload the file. You are allowed to upload only 10 photos at a time."
        );
      }
    }
  };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const newFiles = Array.from(e.target.files);
  
  //     if (images.length + newFiles.length <= 10) {
  //       try {
  //         const uploadedFileUrls = await Promise.all(
  //           newFiles.map((file) => uploadFile(file))
  //         );
  
  //         setImages((prevFiles) => [
  //           ...prevFiles,
  //           ...uploadedFileUrls, // Store the uploaded file URLs
  //         ]);
  //       } catch (error) {
  //         toasterInfo("Failed to upload some files.");
  //       }
  //     } else {
  //       toasterInfo("You are allowed to upload only 10 photos at a time.");
  //     }
  //   }
  // };

  const handleImageDelete = (index: number) => {
    setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => { };
  return (
    <>
      <Formik
        initialValues={{
          content: value,
          images: images,
          visibility: selectedIcon,
        }}
        validationSchema={validationPostSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white w-full max-w-[800px] rounded-[12px] shadow-lg">
                <PopupHeader title={"Create a Post"} onClick={closePopup} />
                <div className="p-4 ">
                  <div className="flex items-center mb-2 gap-4">
                    <Image
                      src="/profile-avatar-legacy-50.png"
                      alt="Image"
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-lg text-[var(--highlight)]">
                        LordLexxy
                      </span>
                      <div className="text-[13px] text-gray-500/50 flex items-center gap-2">
                        <div className="border p-2 rounded">
                          {selectedIcon || <GoGlobe />}
                        </div>{" "}
                        <TiArrowSortedDown onClick={toggleVisibility} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col">
                      <div className="!z-1">
                        <QuillEditor value={value} setValue={setValue} />
                      </div>
                      <div className="my-2 relative">
                        <button onClick={handleEmojis}>
                          <BsEmojiSmile className="w-6 h-6" />
                        </button>
                        {emoji && (
                          <div ref={emojiPickerRef}>
                            <EmojiPicker
                              className="max-w-[300px] max-h-[350px] !absolute right-0 top-[50%] translate-y-[-50%]"
                              onEmojiClick={handleEmojiSelect}
                              searchDisabled
                              autoFocusSearch
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {(selectedName == "camera" ||
                    selectedName == "video" ||
                    selectedName == "document") && (
                      <>
                        <div className="border p-2 text-center flex flex-col justify-center items-center">
                          {selectedName === "camera" && (
                            <div className="mt-4">
                              <div className="bg-gray-50 p-8 rounded-xl shadow-md">
                                <div className="p-6 bg-gray-100 rounded-xl border-dashed border-2 border-gray-300">
                                  <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-[var(--highlight-blue)] py-4 px-6 rounded-md mt-4 block text-center transition-all "
                                  >
                                    <span className="text-sm text-[var(--highlight)]">
                                      Drag & Drop your file here or
                                    </span>
                                    <span className="text-sm mt-2 ml-1 text-[var(--highlight)] underline">
                                      Browse
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <Field
                                type="file"
                                name="images"
                                onChange={handleFileChange}
                                ref={ImageInputRef}
                                id="file-upload"
                                className="hidden"
                                multiple
                              />
                              {images.length > 0 && (
                                <div className="relative mt-4 grid grid-cols-4 gap-4">
                                  {images.map((file, index) => (
                                    <div key={index} className="relative">
                                      <Image
                                        src={URL.createObjectURL(file)}
                                        alt="uploaded"
                                        height={70}
                                        width={100}
                                        className="object-cover rounded-lg w-40 h-30"
                                      />
                                      <RxCross2
                                        onClick={() => handleImageDelete(index)}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"  // Adjust z-index here
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              <ErrorMessage
                                name="images"
                                component="div"
                                className="text-red-500 text-sm mt-2"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  {selectedName == "gif" && <GifSearch />}
                  <div className="flex justify-between">
                    <div>
                      <section className="border-t border-gray-500/10 p-4 flex gap-4 ">
                        <span className="cursor-pointer">
                          <MdOutlineLinkedCamera
                            name="camera"
                            className="w-6 h-6 fill-green-600"
                            onClick={handleOnClick}
                          />
                        </span>
                        <span className="cursor-pointer">
                          <HiOutlineVideoCamera
                            name="video"
                            className="w-6 h-6 stroke-yellow-500"
                            onClick={handleOnClick}
                          />
                        </span>
                        <span className="cursor-pointer">
                          <IoDocumentAttachOutline
                            name="document"
                            className="w-6 h-6 stroke-rose-500"
                            onClick={handleOnClick}
                          />
                        </span>
                        <span className="cursor-pointer">
                          <HiOutlineGif
                            name="gif"
                            className="w-6 h-6 stroke-purple-700"
                            onClick={handleOnClick}
                          />
                        </span>
                        <span className="cursor-pointer">
                          <BiBarChartSquare
                            name="poll"
                            className="w-6 h-6 fill-black"
                            onClick={handleOnClick}
                          />
                        </span>
                      </section>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSchedulePopupOpen(true)}
                        className="bg-slate-300 hover:bg-blue-200 text-white px-2 py-2 rounded-md flex items-center gap-1"
                      >
                        {/* Open Schedule Post Popup */}
                        <span>
                          <PiClockFill size={20} />
                        </span>
                        <span>
                          <FaCaretDown size={15} />
                        </span>
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
          </Form>
        )}
      </Formik>

      {toggleVisibilityPopup && (
        <VisibilityPopup
          toggleVisibilityPopup={() => setToggleVisibilityPopup(false)}
          groups={["Support"]}
          setSelectedVisibility={() => { }}
          sendSelectedIcon={handleSelectedIcon}
        />
      )}
    </>
  );
};

export default CreatePostPopup;
