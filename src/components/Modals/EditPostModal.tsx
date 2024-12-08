import { useApi } from '@/hooks/useAPI';
import { Field, Form, Formik } from 'formik';
import { useState, useEffect, useRef } from 'react';

import PopupHeader from '../Header/PopupHeader';
import Image from 'next/image';
import { capitalizeName } from '@/utils/capitalizeName';
import { useSelector } from 'react-redux';
import QuillEditor from '../core/QuillEditor';
import EmojiPicker from 'emoji-picker-react';
import { FiFile } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { PiGifFill } from "react-icons/pi";

import { MdInsertChart } from "react-icons/md";
import { TbFileTypeXls } from "react-icons/tb";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";
import { IoDocumentAttach } from "react-icons/io5";
import { uploadMultiFile } from "../core/UploadFile";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline, IoDocumentTextSharp } from "react-icons/io5";
import VisibilityPopup from './CreatePostVisibilty';

import MiniLoader from '../Loaders/Miniloader';
import { toasterInfo } from '../core/Toaster';
import { BsEmojiSmile } from 'react-icons/bs';
import { GoGlobe } from 'react-icons/go';
import { CiCamera, CiVideoOff, CiVideoOn } from 'react-icons/ci';
import { TiArrowSortedDown } from 'react-icons/ti';


const EditPostModal = ({ postId, onClose }: { postId: any; onClose: () => void }) => {
    const { API } = useApi()
    const [emoji, setEmoji] = useState(false);
    const [value, setValue] = useState<any>("");
    const [selectedName, setSelectedName] = useState("");

    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const userId = useSelector((state: any) => state.auth.id);

    const firstName = useSelector((state: any) => state.auth.firstName);
    const lastName = useSelector((state: any) => state.auth.lastName);

    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [toggleVisibilityPopup, setToggleVisibilityPopup] = useState(false);

    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const [initialValues, setInitialValues] = useState<any>({
        userId: userId,
        content: "",
        mediaUrl: [],
        sharedLink: "",
        post_type: "",
        visibilty: "public"
    });


    const [selectedVisibility, setSelectedVisibility] = useState<{
        icon: string | null;
        name: string;
        id: any
    } | null>(null);

    useEffect(() => {
        if (postId) {
            getPostData();
        }
    }, [postId]);

    console.log(images, "================");

    const getPostData = async () => {
        const { success, error, data } = await API.get(`posts/fetch-by-id?id=${postId}`);
        if (success) {
            console.log(data);
            setInitialValues({
                content: data.content,
                mediaUrl: data.media_url,
                sharedLink: data.sharedLink,
                post_type: data.post_type,
                visibility: data.visibility
            })
            setValue(data.content);
            if (data.media_url) {
                if (data.post_type === 'image') {
                    setImages(data.media_url);
                } else if (data.post_type === 'video') {
                    setVideos(data.media_url);
                } else if (data.post_type === 'file') {
                    setFiles(data.media_url);
                }
            }
        } else {
            console.log(error);
        }
    };

    const handleEmojis = () => {
        setEmoji((prev) => !prev);
    };

    const toggleVisibility = () => {
        setToggleVisibilityPopup((prev) => !prev);
    };

    const handleOnClick = (e: React.MouseEvent<SVGElement, MouseEvent>, name: any) => {
        if (name === "image" && !images) {
            setSelectedName("image");
        } else if (name === "video" && !videos) {
            setSelectedName("video");
            // setPopupType("video");
        }
        else {
            setSelectedName(name);
            // setPopupType(name)
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


    const iconMapping = [
        {
            name: "image",
            activeIcon: <FaCamera className="w-6 h-6 fill-green-600" />,
            inactiveIcon: (
                <MdOutlineLinkedCamera
                    className={`w-6 h-6 fill-green-600 ${videos.length ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={(e) => handleOnClick(e, "image")}
                />
            ),

        },
        {
            name: "video",
            activeIcon: <FaVideo className="w-6 h-6 fill-yellow-600" />,
            inactiveIcon: (
                <HiOutlineVideoCamera
                    className={`w-6 h-6 stroke-yellow-500 ${images.length ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={(e) => handleOnClick(e, "video")}
                />
            ),
        },
        {
            name: "document",
            activeIcon: <IoDocumentAttach className="w-6 h-6 fill-rose-600" />,
            inactiveIcon: (
                <IoDocumentAttachOutline
                    className={`w-6 h-6 stroke-rose-500 ${(images.length || videos.length) ? 'pointer-events-none opacity-50' : ''}`}
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
                    className="w-6 h-6 fill-white"
                    onClick={(e) => handleOnClick(e, "poll")}
                />
            ),
        },
    ];

    const IconSection = ({ selectedName, type }: any) => (
        <div className="">
            <section className=" p-4 flex gap-4">
                {iconMapping.map(({ name, activeIcon, inactiveIcon }) => (
                    <span key={name} className="cursor-pointer">
                        {selectedName === name || type === name ? activeIcon : inactiveIcon}
                    </span>
                ))}
            </section>
        </div>
    );

    const handleEmojiSelect = (emoji: any) => {
        if (typeof window !== "undefined") {
            const quillEditor = document.querySelector(".ql-editor") as HTMLElement;
            if (quillEditor) {
                const currentText = quillEditor.innerHTML;
                setValue(currentText + emoji.emoji);
                // setInitialValues((prevValues: any) => ({
                //     ...prevValues,
                //     content: currentText + emoji.emoji,
                // }));
            }
        }
    };

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
    const handleSelectedIcon = (option: any) => {
        setSelectedVisibility({ icon: option.icon, name: option.name, id: option.id });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);

            if (newFiles.length + getFileCount(name) <= 10) {
                const fileTypeMapping: { [key: string]: React.Dispatch<React.SetStateAction<File[]>> } = {
                    images: setImages,
                    video: setVideos,
                    document: setFiles,
                };

                const setFileHandler = fileTypeMapping[name];

                try {
                    setIsUploadLoading(true);
                    const uploadData = await uploadMultiFile(newFiles, API);
                    setIsUploadLoading(false);

                    if (setFileHandler) {
                        setFileHandler((prevFiles) => [...prevFiles, ...newFiles]);
                    }

                    setInitialValues((prevValues: any) => ({
                        ...prevValues,
                        mediaUrl: uploadData,
                    }));

                } catch (error) {
                    setIsUploadLoading(false);
                    toasterInfo("An error occurred while uploading the file. Please try again.");
                }

            } else {
                setIsUploadLoading(false);
                toasterInfo("Unable to upload the file. You are allowed to upload only 10 files at a time.", 1000, "id");
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
        setInitialValues((prevValues: any) => ({
            ...prevValues,
            mediaUrl: prevValues.mediaUrl.filter((_: any, i: any) => i !== index),
        }));
    };

    const renderFilePreview = (file: File) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (fileExtension === 'pdf') {
            return <IoDocumentTextSharp className="w-6 h-6 text-gray-600" />;
        }

        if (fileExtension === 'xls' || fileExtension === 'xlsx') {
            return <TbFileTypeXls className="w-6 h-6 text-green-600" />;
        }

        return <FiFile className="w-6 h-6 text-gray-600" />;
    };
    const renderFileUploadSection = (
        fieldName: any,
        icon: JSX.Element,
        label: string,
        acceptedFiles: string,
        fileType: string,
        filesList: any[] // List of files to display
    ) => {
        return (
            <div className="mb-4">
                <label
                    htmlFor={`file-upload-${fieldName}`}
                    className="cursor-pointer text-[var(--highlight-blue)] mt-4 block text-center transition-all"
                >
                    <div className="flex flex-col items-center justify-center p-2">
                        <div className="bg-gray-200 rounded-full p-4">
                            {icon}
                        </div>
                        <span className="mt-2 text-lg text-white">{label}</span>
                        <span className="text-md font-bold text-white">or Drag and Drop File</span>
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
                {isUploadLoading ? (
                    <MiniLoader />
                ) : filesList.length > 0 ? (
                    <div className="relative mt-4 grid grid-cols-4 gap-4 uploaded-data">
                        {filesList.map((file, index) => (
                            console.log(file),
                            <div key={index} className="relative uploaded-dataInner">
                                {fileType === "image" && file instanceof File ? (
                                    <Image
                                        // Using createObjectURL only if file is an instance of File
                                        src={URL.createObjectURL(file)}
                                        alt="uploaded"
                                        height={70}
                                        width={100}
                                        className="object-cover rounded-lg w-40 h-30"
                                    />
                                ) : null}

                                {fileType === "video" && file instanceof File ? (
                                    <video
                                        controls
                                        className="object-cover rounded-lg w-40 h-30"
                                    >
                                        <source src={URL.createObjectURL(file)} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : null}

                                {fileType === "document" ? (
                                    <div className="flex items-center justify-center w-full h-30">
                                        {renderFilePreview(file)}
                                        <span className="ml-2 text-sm text-gray-600">{file.name}</span>
                                    </div>
                                ) : null}

                                <RxCross2
                                    onClick={() => handleFileDelete(index, fieldName)}
                                    className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    };

    const handleSubmit = () => { }

    return (
        <>
            <Formik
                initialValues={{ postType: "", content: "", mediaUrl: [], sharedLink: "", type: "" }}
                onSubmit={(e: any) => handleSubmit()}
            >
                {({ errors, isSubmitting }: any) => (
                    <Form>
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="max-h-[80vh] overflow-auto bg-[var(--sections)] border border-white/10 w-full max-w-[600px] rounded-[12px] shadow-lg">
                                <PopupHeader title={"Edit a Post"} onClick={onClose} />
                                <div className="p-4">
                                    <div className="flex items-center mb-4 gap-2">
                                        <Image
                                            src="/profile-avatar-legacy-50.png"
                                            alt="Image"
                                            height={40}
                                            width={40}
                                            className="rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold">
                                                {capitalizeName(firstName)} {capitalizeName(lastName)}
                                            </span>
                                            <div className="text-[13px] text-gray-500/50 flex items-center gap-2 cursor-pointer" onClick={toggleVisibility}>
                                                <div>
                                                    {(selectedVisibility && selectedVisibility.id === "Group") ? (
                                                        <Image
                                                            src={typeof selectedVisibility.icon === 'string' ? selectedVisibility.icon : '/profile-avatar-legacy-50.png'}
                                                            height={15}
                                                            width={15}
                                                            alt="Group"
                                                        />
                                                    ) : selectedVisibility && selectedVisibility.icon && typeof selectedVisibility.icon === 'string' ? (
                                                        <Image
                                                            src={selectedVisibility.icon}
                                                            height={15}
                                                            width={15}
                                                            alt="Icon"
                                                        />
                                                    ) : (
                                                        <GoGlobe />
                                                    )}


                                                </div>
                                                <p className="text-sm">{initialValues.visibility ? initialValues.visibility : "Public"}</p>
                                                <TiArrowSortedDown />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mb-2">
                                        <div className="flex flex-col">
                                            <div className="!z-1">
                                                <QuillEditor value={value} setValue={setValue}
                                                />
                                            </div>

                                            <div className="my-2 relative">
                                                <button type="button" onClick={handleEmojis}>
                                                    <BsEmojiSmile className="w-6 h-6" />
                                                </button>
                                                {emoji && (
                                                    <div ref={emojiPickerRef}>
                                                        <EmojiPicker
                                                            lazyLoadEmojis={true}
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

                                    {(initialValues.post_type === "image" ||
                                        initialValues.post_type === "video" ||
                                        initialValues.post_type === "document") && (
                                            <div className="border border-white/5 rounded-lg p-2 text-center flex flex-col justify-center items-center bg-white/10">
                                                {initialValues.post_type === "image" ? renderFileUploadSection(
                                                    'images',
                                                    <CiCamera size={30} />,
                                                    'Add Photos',
                                                    'image/*',
                                                    'image',
                                                    images
                                                ) : null}

                                                {initialValues.post_type === "video" ? renderFileUploadSection(
                                                    'video',
                                                    <CiVideoOn size={30} />,
                                                    'Add Videos',
                                                    'video/*',
                                                    'video',
                                                    videos
                                                ) : null}

                                                {initialValues.post_type === "document" ? renderFileUploadSection(
                                                    'document',
                                                    <IoDocumentAttachOutline size={30} />,
                                                    'Add Files',
                                                    '.pdf,.doc,.docx,.txt,.xlsx',
                                                    'document',
                                                    files
                                                ) : null}
                                            </div>
                                        )}
                                    {/* {selectedName == "gif" && <GifSearch />} */}
                                    <div className="pt-4 flex justify-between border-t border-gray-500/10">
                                        <IconSection selectedName={selectedName} type={initialValues.post_type} />
                                        <div className="flex items-center gap-1">

                                            <button
                                                type="submit"
                                                disabled={isSubmitting || Object.keys(errors).length > 0}
                                                className={`${isSubmitting || Object.keys(errors).length > 0
                                                    ? "bg-gray-400"
                                                    : "bg-[var(--highlght-hover)]"
                                                    } text-white rounded-md px-3 py-2`}
                                            >
                                                {"Update Post"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            {toggleVisibilityPopup && (
                <VisibilityPopup
                    toggleVisibilityPopup={() => setToggleVisibilityPopup(false)}
                    groups={["Support"]}
                    sendSelectedIcon={(option: any) => handleSelectedIcon(option)}
                    selectedVisibility={selectedVisibility}
                />
            )}
        </>
    );

};

export default EditPostModal;
