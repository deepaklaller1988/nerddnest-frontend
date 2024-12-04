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
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
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
import { validationPostSchema } from "@/utils/validationSchemas";
import { useFormikContext } from 'formik';

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
  const { values, setFieldValue, errors, setFieldError, setErrors } = useFormik({
    initialValues: { mediaUrl: [] },
    validationSchema: validationPostSchema,
    onSubmit: (values) => {
      // Your submit logic
    }
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
  const getFileCount = (name: string): number => {
    switch (name) {
      case 'images':
        return images.length;
      case 'video':
        return videos.length;
      case 'document':
        return files.length;
      default:
        return 0;
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
  
      if (newFiles.length + getFileCount(name) <= 10) { // Validate the total files count for each type
        const fileTypeMapping: { [key: string]: React.Dispatch<React.SetStateAction<File[]>> } = {
          images: setImages,
          video: setVideos,
          document: setFiles,
        };
  
        const setFileHandler = fileTypeMapping[name];
  
        if (setFileHandler) {
          setFileHandler((prevFiles) => [...prevFiles, ...newFiles]);
        }
  
        try {
          let uploadData;

            uploadData = await uploadMultiFile(newFiles, API); // Upload multiple files
  
          setInitialValues((prevValues: any) => ({
            ...prevValues,
            mediaUrl: uploadData,
          }));
          setFieldError("mediaUrl", undefined);

        } catch (error) {
          console.error("Error uploading file:", error);
          toasterInfo("An error occurred while uploading the file. Please try again.");
        }
      } else {
        toasterInfo("Unable to upload the file. You are allowed to upload only 10 files at a time.");
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
  const renderFileUploadSection = (fieldName: any, icon: JSX.Element, label: string, acceptedFiles: string, fileType: string, filesList: any[]) => {
  
  return (
      <div className="mt-4">
        <label
          htmlFor={`file-upload-${fieldName}`}
          className="cursor-pointer text-[var(--highlight-blue)] mt-4 block text-center transition-all"
        >
          <div className="flex flex-col items-center justify-center p-2">
            <div className="bg-gray-200 rounded-full p-4">
              {icon}
            </div>
            <span className="text-lg text-[var(--highlight)]">{label}</span>
            <span className="text-md mt-1 text-[var(--highlight)]">or Drag and Drop File</span>
          </div>
        </label>
        <Field
          type="file"
          name={fieldName}
          onChange={handleFileChange}
          id={`file-upload-${fieldName}`}
          className="hidden"
          accept={acceptedFiles}
          multiple
        />
        {filesList.length > 0 && (
          <div className="relative mt-4 grid grid-cols-4 gap-4">
            {filesList.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="uploaded"
                  height={70}
                  width={100}
                  className="object-cover rounded-lg w-40 h-30"
                />
                <RxCross2
                  onClick={() => handleFileDelete(index, fieldName)}
                  className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                />
              </div>
            ))}
          </div>
        )}
       
      </div>
    );
  };


  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);
      console.log('Submitted values:', values);
      toasterSuccess("Post created successfully!");
    } catch (error) {
      toasterInfo("There was an issue submitting your post.");
    } finally {
      setIsSubmitting(false);
    }
  };
  


  return (
    <>
      <Formik
      initialValues={{ userId, postType: "", content: "", mediaUrl: [], sharedLink: "", type: "" }}
      validationSchema={validationPostSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue,errors ,setErrors,isSubmitting}: any) => (
          console.log(errors),
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
{errors.mediaUrl && (
            <div className="text-red-500 text-sm">{errors.mediaUrl}</div>
          )}                      </div>

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
             

<>
      {((selectedName === "image" || type === "image") ||
        (selectedName === "video" || type === "video") ||
        (selectedName === "document" || type === "document")) && (
        <div className="border p-2 text-center flex flex-col justify-center items-center bg-gray-100">
          {selectedName === "image" || type === "image" ? renderFileUploadSection(
            'images',
            <CiCamera size={30} />,
            'Add Photos',
            'image/*',
            'image',
            images
          ) : null}

          {selectedName === "video" || type === "video" ? renderFileUploadSection(
            'video',
            <CiVideoOn size={30} />,
            'Add Videos',
            'video/*',
            'video',
            videos
          ) : null}

          {selectedName === "document" || type === "document" ? renderFileUploadSection(
            'document',
            <IoDocumentAttachOutline size={30} />,
            'Add Files',
            '.pdf,.doc,.docx,.txt,.xlsx',
            'document',
            files
          ) : null}
        </div>
      )}
    </>
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