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
import { Field, Form, Formik } from "formik";
import { toasterInfo, toasterSuccess } from "../core/Toaster";
import { RxCross2 } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { PiGifFill } from "react-icons/pi";
import { MdInsertChart } from "react-icons/md";

import { IoDocumentAttach } from "react-icons/io5";
import { uploadFile, uploadMultiFile } from "../core/UploadFile";
import { useApi } from "@/hooks/useAPI";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/errorHandler";
import { useSelector } from "react-redux";

interface CreatePostPopupProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: any
  setPopupType: any
}

const CreatePostPopup: React.FC<CreatePostPopupProps> = ({
  setIsPopupOpen,
  type,
  setPopupType
}) => {
  const { API } = useApi();
  const router = useRouter()
  const ImageInputRef = useRef<HTMLInputElement>(null);
  const VideoInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const userId = useSelector((state: any) => state.auth.id);
  const [toggleVisibilityPopup, setToggleVisibilityPopup] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(
    null
  );
  const [selectedName, setSelectedName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSchedulePopupOpen, setSchedulePopupOpen] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [value, setValue] = useState<any>("");
  const [initialValues, setInitialValues] = useState<any>({
    userId: userId,
    postType: "",
    content: "",
    mediaUrl: [],
    sharedLink: "",
    type: ""
  });

  const iconMapping = [
    {
      name: "image",
      activeIcon: <FaCamera className="w-6 h-6 fill-green-600" />,
      inactiveIcon: (
        <MdOutlineLinkedCamera
          className="w-6 h-6 fill-green-600"
          onClick={(e) => handleOnClick(e, "image")}
        />
      ),
    },
    {
      name: "video",
      activeIcon: <FaVideo className="w-6 h-6 fill-yellow-600" />,
      inactiveIcon: (
        <HiOutlineVideoCamera
          className="w-6 h-6 stroke-yellow-500"
          onClick={(e) => handleOnClick(e, "video")}
        />
      ),
    },
    {
      name: "document",
      activeIcon: <IoDocumentAttach className="w-6 h-6 fill-rose-600" />,
      inactiveIcon: (
        <IoDocumentAttachOutline
          className="w-6 h-6 stroke-rose-500"
          onClick={(e) => handleOnClick(e, "document")}
        />
      ),
    },
    {
      name: "gif",
      activeIcon: <PiGifFill className="w-6 h-6 fill-purple-600" />,
      inactiveIcon: (
        <HiOutlineGif
          className="w-6 h-6 stroke-purple-700"
          onClick={(e) => handleOnClick(e, "gif")}
        />
      ),
    },
    {
      name: "poll",
      activeIcon: <MdInsertChart className="w-6 h-6 fill-black-600" />,
      inactiveIcon: (
        <BiBarChartSquare
          className="w-6 h-6 fill-black"
          onClick={(e) => handleOnClick(e, "poll")}
        />
      ),
    },
  ];

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

  const handleOnClick = (e: React.MouseEvent<SVGElement, MouseEvent>, name: any) => {
    if (name) {
      setSelectedName(name);
      setPopupType(name)
    }
  };
console.log(initialValues,"initialValues")
  const IconSection = ({ selectedName, type }: any) => (
    <div>
      <section className="border-t border-gray-500/10 p-4 flex gap-4">
        {iconMapping.map(({ name, activeIcon, inactiveIcon }) => (
          <span key={name} className="cursor-pointer">
            {selectedName === name || type === name ? activeIcon : inactiveIcon}
          </span>
        ))}
      </section>
    </div>
  );
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      if (images.length + newFiles.length <= 10) {
        const fileTypeMapping: any = {
          images: setImages,
          video: setVideos,
          document: setFiles
        };

        const setFileHandler = fileTypeMapping[name];

        if (setFileHandler) {
          setFileHandler((prevFiles: any) => [...prevFiles, ...newFiles]);
        }

        try {
          let uploadData;

          if (newFiles.length === 1) {
            uploadData = await uploadFile(newFiles[0], API);
          } else {
            uploadData = await uploadMultiFile(newFiles, API);
          }

          setInitialValues((prevValues: any) => ({
            ...prevValues,
            mediaUrl: uploadData,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
        }

      } else {
        toasterInfo("Unable to upload the file. You are allowed to upload only 10 photos at a time.");
      }
    }
  };
  const handleFileDelete = (index: number, type: 'images' | 'video' | 'document') => {
    if (type === 'images') {
      setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === 'video') {
      setVideos((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === 'document') {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };
  const validateFields = () => {
    const newErrors: any = {};

    if (!value || value.trim() === "") {
      newErrors.content = "Content is required.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    if (validateFields()) {

      try {
        const { success, data, error } = await API.post("posts/create", initialValues);
        if (success) {
          toasterSuccess("Post created successfully!", 1000, "id");
          router.push("/home");
        } else {
          toasterInfo(getErrorMessage(error.code));
        }
      } catch (error) {
        toasterInfo("Error creating post. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationPostSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }: any) => (

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
                        </div>
                        <TiArrowSortedDown onClick={toggleVisibility} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col">
                      <div className="!z-1">
                        <QuillEditor value={value} setValue={setValue}
                        />

                      </div>
                      {errors.content && (
                        <div className="text-red-500 text-sm mt-2">{errors.content}</div>
                      )}
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
                  {((selectedName == "image" || type == "image") ||
                    (selectedName == "video" || type == "video") ||
                    (selectedName == "document" || type == "document")) && (
                      <>
                        <div className="border p-2 text-center flex flex-col justify-center items-center bg-gray-100">
                          {(selectedName === "image" || type == "image") && (
                            <div className="mt-4">
                              <div className="">
                                <div className="">
                                  <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-[var(--highlight-blue)]  mt-4 block text-center transition-all"
                                  >
                                    <div className="flex flex-col items-center justify-center p-2">
                                      <div className="bg-gray-200 rounded-full p-4">
                                        <CiCamera size={30} />
                                      </div>
                                      <span className="text-lg text-[var(--highlight)]">Add Photos</span>
                                      <span className="text-md mt-1 text-[var(--highlight)]">
                                        or Drag and Drop File
                                      </span>
                                    </div>
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
                                        onClick={() => handleFileDelete(index, "images")}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"  // Adjust z-index here
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                          )}

                          {(selectedName === "video" || type == "video") && (
                            <div className="mt-4">
                              <div className="">
                                <div className="">
                                  <label
                                    htmlFor="file-upload1"
                                    className="cursor-pointer text-[var(--highlight-blue)]  mt-4 block text-center transition-all"
                                  >
                                    <div className="flex flex-col items-center justify-center p-2">
                                      <div className="bg-gray-200 rounded-full p-4">
                                        <CiVideoOn size={30} />
                                      </div>
                                      <span className="text-lg text-[var(--highlight)]">Add Videos</span>
                                      <span className="text-md mt-1 text-[var(--highlight)]">
                                        or Drag and Drop File
                                      </span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <Field
                                type="file"
                                name="video"
                                onChange={handleFileChange}
                                ref={VideoInputRef}
                                id="file-upload1"
                                className="hidden"
                                accept="video/*"
                                multiple
                              />
                              {videos.length > 0 && (
                                <div className="relative mt-4 grid grid-cols-4 gap-4">
                                  {videos.map((file, index) => (
                                    <div key={index} className="relative">
                                      <Image
                                        src={URL.createObjectURL(file)}
                                        alt="uploaded"
                                        height={70}
                                        width={100}
                                        className="object-cover rounded-lg w-40 h-30"
                                      />
                                      <RxCross2
                                        onClick={() => handleFileDelete(index, "video")}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"  // Adjust z-index here
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              {/* <ErrorMessage
                                name="video"
                                component="div"
                                className="text-red-500 text-sm mt-2"
                              /> */}
                            </div>
                          )}

                          {(selectedName === "document" || type == "document") && (
                            <div className="mt-4">
                              <div className="">
                                <div className="">
                                  <label
                                    htmlFor="file-upload3"
                                    className="cursor-pointer text-[var(--highlight-blue)]  mt-4 block text-center transition-all"
                                  >
                                    <div className="flex flex-col items-center justify-center p-2">
                                      <div className="bg-gray-200 rounded-full p-4">
                                        <IoDocumentAttachOutline size={30} />
                                      </div>
                                      <span className="text-lg text-[var(--highlight)]">Add Files</span>
                                      <span className="text-md mt-1 text-[var(--highlight)]">
                                        or Drag and Drop File
                                      </span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <Field
                                type="file"
                                name="document"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.txt,.xlsx"
                                ref={ImageInputRef}
                                id="file-upload3"
                                className="hidden"
                                multiple
                              />
                              {files.length > 0 && (
                                <div className="relative mt-4 grid grid-cols-4 gap-4">
                                  {files.map((file, index) => (
                                    <div key={index} className="relative">
                                      <Image
                                        src={URL.createObjectURL(file)}
                                        alt="uploaded"
                                        height={70}
                                        width={100}
                                        className="object-cover rounded-lg w-40 h-30"
                                      />
                                      <RxCross2
                                        onClick={() => handleFileDelete(index, "document")}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"  // Adjust z-index here
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              {/* <ErrorMessage
                                name="document"
                                component="div"
                                className="text-red-500 text-sm mt-2"
                              /> */}
                            </div>
                          )}

                        </div>
                      </>
                    )}


                  {selectedName == "gif" && <GifSearch />}
                  <div className="flex justify-between">
                    <IconSection selectedName={selectedName} type={type} />
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSchedulePopupOpen(true)}
                        className="bg-slate-300 hover:bg-blue-200 text-white px-2 py-2 rounded-md flex items-center gap-1"
                      >
                        <span>
                          <PiClockFill size={20} />
                        </span>
                        <span>
                          <FaCaretDown size={15} />
                        </span>
                      </button>{" "}
                      <button
                        type="submit"
                        disabled={isSubmitting || Object.keys(errors).length > 0}
                        className={`${isSubmitting || Object.keys(errors).length > 0
                          ? "bg-gray-400"
                          : "bg-[var(--highlght-hover)]"
                          } text-white rounded-md px-3 py-2`}
                      >
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
