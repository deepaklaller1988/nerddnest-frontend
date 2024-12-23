import React, { useRef, useState } from 'react'
import { HiOutlineGif, HiOutlineVideoCamera } from "react-icons/hi2";
import { IoIosSend } from "react-icons/io";
import ButtonFunction from './ButtonFunction';
import { RxCross2 } from 'react-icons/rx';
import MiniLoader from '../Loaders/Miniloader';
import { toasterError, toasterInfo } from '../core/Toaster';
import { useApi } from "@/hooks/useAPI";
import { uploadMultiFile } from '../core/UploadFile';
import { MdOutlineLinkedCamera } from 'react-icons/md';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { BiBarChartSquare } from 'react-icons/bi';
import CreatePostPopup from '../Modals/CreatePostModal';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';

const MessageChatwindow = ({ id, commentsCount, updateCommentsCount }: any) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<{ mediaUrl: string[] }>({ mediaUrl: [] });
    const [popupType, setPopupType] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [emoji, setEmoji] = useState(false);
    const [value, setValue] = useState<any>("");
    const [messageData, setMessageData] = useState<any>([]);
    // const [messageComment, setMessageComment] = useState<any>(false)
    const { API } = useApi();
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const videoInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const userId = useSelector((state: any) => state.auth.id);


    const handleDeleteMedia = (type: 'images' | 'video' | 'files', index: number) => {
        if (type === 'images') {
            setImages(images.filter((_, i) => i !== index));
        } else if (type === 'video') {
            setVideos(videos.filter((_, i) => i !== index));
        } else if (type === 'files') {
            setFiles(files.filter((_, i) => i !== index));
        }
    };

    const getFileCount = (name: 'images' | 'video' | 'document'): number => {
        if (name === "images") return images.length;
        if (name === "video") return videos.length;
        if (name === "document") return files.length;
        return 0;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            const newFiles = Array.from(files);

            if (newFiles.length + getFileCount(name as 'images' | 'video' | 'document') <= 10) {
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

                    setInitialValues((prevValues) => ({
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

    const handleMediaTypeSelection = (type: 'image' | 'videos' | 'files') => {
        if (type === 'image' && imageInputRef.current) {
            imageInputRef.current.click();
        } else if (type === 'videos' && videoInputRef.current) {
            videoInputRef.current.click();
        } else if (type === 'files' && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClick = (type: string) => {
        setPopupType(type);
        setIsPopupOpen(true);
    };

    const handleSend = () => {
        if (message.trim()) {
            console.log("Message sent:", message);
            setMessage("");
        }
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
                setInitialValues((prevValues: any) => ({
                    ...prevValues,
                    content: currentText + emoji.emoji,
                }));
            }
        }
    };

    const postMessage = async (comment: string) => {
        if (!comment.trim() && images.length === 0 && videos.length === 0 && files.length === 0) {
            toasterError("Please enter a message or add media."); // Notify the user
            return;
        }
        try {
            const { success, error } = await API.post("posts/comment", {
                postId: id,
                commenterId: userId,
                comment,
                contentType: images.length > 0 ? "images" : videos.length > 0 ? "video" : files.length > 0 ? "files" : "text",
                mediaUrl: initialValues.mediaUrl ? initialValues.mediaUrl : ""
            });
            if (success) {
                setMessage("");
                setImages([])
                setVideos([])
                setFiles([])
                getAllMessageData(id);
                updateCommentsCount(id, commentsCount + 1);
            } else {
                toasterError(error || "Failed to send message");
            }
        } catch (err) {
            console.error("Error sending messages:", err);
            toasterError("An error occurred while sending the message");
        }
    };

    const getAllMessageData = async (postId: any) => {
        try {
            const { success, error, data } = await API.get(
                `posts/get-comments?postId=${postId}`
            );
            if (success) {
                setMessageData(data);
            } else {
                toasterError(error || "Failed to load messages");
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
            toasterError("An error occurred while fetching messages");
        }
    };

    return (
        <>
            {/* we can modify it later  */}
            {isPopupOpen && (
                <div
                    ref={popupRef}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
                >
                    <CreatePostPopup setIsPopupOpen={setIsPopupOpen} type={popupType} setPopupType={setPopupType} />
                </div>
            )}

            <div className="flex-1 flex flex-col bg-[var(--sections)]">
                <div className="flex items-center justify-between gap-6 border-b border-white/5 p-4">
                    <div className="flex gap-3">
                        <div className="w-14 rounded-full overflow-hidden border-2 border-white">
                            <img src="dp.jpg" alt="" />
                        </div>
                        <div>
                            <h3 className="capitalize text-lg font-semibold text-white">Avion Astro</h3>
                            <p className="">Started Friday</p>
                        </div>
                    </div>
                    <ButtonFunction marginTop='20px' right='' left='' width='' height='' />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white/10 border-b border-white/5">
                    {/* Render Messages */}
                    <div className="w-full receiver">
                        <div className="inline-flex items-start space-x-3 bg-[var(--sections)] rounded-xl p-4 max-w-[80%]">
                            <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
                                <img src="dp.jpg" alt="dp" />
                            </div>
                            <div>
                                <p className="text-white">Hi, I am Marcos from Amazon...</p>
                                <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Sender Message */}
                    <div className="w-full sender flex justify-end">
                        <div className="inline-flex items-start space-x-3 bg-black/20 rounded-xl p-4 max-w-[80%]">
                            <div>
                                <p className="text-white">Hi, I am Marcos from Amazon...</p>
                                <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Input and Upload Section */}
                <div className="mt-3">
                    <div className="w-full">
                        <section className="flex gap-4 cursor-pointer p-4">
                            <div>
                                <textarea
                                    className="resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                                    ref={textareaRef}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write a message..."
                                />
                                {/* <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                                    <IoPaperPlaneSharp className="fill-white" onClick={() => postMessage(message)} />
                                </button> */}
                            </div>
                        </section>
                        <div className="border-t border-gray-500/10 flex justify-between items-center">
                            <section className=" flex ">
                                {isUploadLoading && <MiniLoader />}
                                <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
                                    {images.length > 0 && images.map((image, index) => (
                                        <div key={index} className="relative uploaded-dataInner">
                                            {image instanceof File && (
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`uploaded-image-${index}`}
                                                    className="object-cover rounded-lg w-full h-full"
                                                />
                                            )}
                                            <RxCross2
                                                onClick={() => handleDeleteMedia('images', index)}
                                                className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Video Files Section */}
                                <div className="">
                                    {videos.length > 0 && videos.map((video, index) => (
                                        <div key={index} className="relative uploaded-dataInner">
                                            {video instanceof File && (
                                                <video
                                                    controls
                                                    src={URL.createObjectURL(video)}
                                                    className="object-cover rounded-lg w-full h-full"
                                                ></video>
                                            )}
                                            <RxCross2
                                                onClick={() => handleDeleteMedia('video', index)}
                                                className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Media Buttons */}
                                <section className="p-4 pt-0 flex gap-4">
                                    <span className={`cursor-pointer ${(videos.length > 0 || files.length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" onClick={() => handleMediaTypeSelection("image")} />
                                    </span>
                                    <span className={`cursor-pointer ${(images.length > 0 || files.length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" onClick={() => handleMediaTypeSelection("videos")} />
                                    </span>
                                    <span className={`cursor-pointer ${(images.length > 0 || videos.length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" onClick={() => handleMediaTypeSelection("files")} />
                                    </span>
                                    <span className="cursor-pointer">
                                        <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
                                    </span>
                                    <span className="cursor-pointer">
                                        <BiBarChartSquare className="w-6 h-6 fill-white" onClick={() => handleClick('poll')} />
                                    </span>

                                    {/* File Inputs */}
                                    <input
                                        type="file"
                                        name="images"
                                        ref={imageInputRef}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <input
                                        type="file"
                                        ref={videoInputRef}
                                        accept="video/*"
                                        multiple
                                        name="video"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <input
                                        type="file"
                                        name="file"
                                        ref={fileInputRef}
                                        accept="/*/"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </section>
                            </section>

                            {/* Send Button */}
                            <section className="p-4 flex gap-4 items-center">
                                <div className="">
                                    <button type="button" onClick={handleEmojis}>
                                        <BsEmojiSmile className="w-6 h-6" />
                                    </button>
                                    {emoji && (
                                        <div ref={emojiPickerRef}>
                                            <EmojiPicker
                                                lazyLoadEmojis={true}
                                                className="max-w-[300px] max-h-[350px] !absolute right-0 top-[50%] translate-y-[-50%]"
                                                onEmojiClick={(emoji) => handleEmojiSelect(emoji)}
                                                searchDisabled
                                                autoFocusSearch
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="p-1 rounded-full">
                                    <IoIosSend onClick={() => postMessage(message)} className="w-6 h-6 fill-white" />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageChatwindow;