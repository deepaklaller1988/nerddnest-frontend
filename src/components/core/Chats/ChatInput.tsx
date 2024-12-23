import { useApi } from '@/hooks/useAPI';
import React, { useEffect, useRef, useState } from 'react';
import { CiFaceSmile } from 'react-icons/ci';
import { HiOutlineGif, HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoIosSend } from 'react-icons/io';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { MdOutlineLinkedCamera } from 'react-icons/md';
import { uploadMultiFile } from '../../../common/UploadFile';
import { toasterInfo } from '../Toaster';
import { RxCross2 } from 'react-icons/rx';
import EmojiPicker from 'emoji-picker-react';

export default function ChatInput() {
    const { API } = useApi()
    const imageInputRef: any = useRef(null);
    const videoInputRef: any = useRef(null);
    const fileInputRef: any = useRef(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [emoji, setEmoji] = useState(false);


    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState<string>("");

    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [initialValues, setInitialValues] = useState()

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


    const getFileCount = (name: string): number => {
        if (name === "images") return images.length;
        if (name === "video") return videos.length;
        if (name === "document") return files.length;
        return 0;
    };
    const handleEmojis = () => {
        setEmoji((prev) => !prev);
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (e.target.files) {
            const newFiles: any = Array.from(e.target.files);

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

    const handleMediaTypeSelection = (type: string) => {
        if (type === 'image' && imageInputRef.current) {
            imageInputRef.current.click();
        } else if (type === 'videos' && videoInputRef.current) {
            videoInputRef.current.click();
        } else if (type === 'files' && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDeleteMedia = (type: string, index: number) => {
        if (type === 'images') {
            setImages(images.filter((_, i) => i !== index));
        } else if (type === 'video') {
            setVideos(videos.filter((_, i) => i !== index));
        } else if (type === 'files') {
            setFiles(files.filter((_, i) => i !== index));
        }
    };

    const handleEmojiSelect = (emoji: { emoji: string }) => {
        setMessage(prevMessage => prevMessage + emoji.emoji);  
    };

    return (
        <div className="mt-3">
            <div className="w-full">

                <section className="flex gap-4 cursor-pointer p-4">
                    <textarea
                        className="text-white/50 resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a comment..."
                    />
                </section>
                <div className="border-t border-gray-500/10 flex justify-between items-center">
                    {isUploadLoading &&
                        <img src="/progress.gif" alt="Loading..." className="w-full h-20" />
                    }
                    {images.length > 0 && images.map((image, index) => (
                        <section className="p-2 pb-4">
                            <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
                                <div key={index} className="relative uploaded-dataInner">
                                    {image instanceof File ? (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`uploaded-image-${index}`}
                                            className="object-cover rounded-lg w-full h-full"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <RxCross2
                                        onClick={() => handleDeleteMedia('images', index)}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                                    />
                                </div>


                            </div>
                        </section>

                    ))}
                    {videos.length > 0 && videos.map((video, index) => (
                        <section className="p-2 pb-4">

                            <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
                                <div key={index} className="relative uploaded-dataInner">
                                    {video instanceof File ? (
                                        <video
                                            controls
                                            src={URL.createObjectURL(video)}
                                            className="object-cover rounded-lg w-full h-full"
                                        ></video>
                                    ) : ("")}
                                    <RxCross2
                                        onClick={() => handleDeleteMedia('video', index)}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                                    />
                                </div>
                            </div>
                        </section>

                    ))}
                    {files.length > 0 && files.map((file, index) => (
                        <section className="p-2 pb-4">

                            <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
                                <div key={index} className="relative uploaded-dataInner">
                                    {file instanceof File ? (
                                        <a
                                            href={URL.createObjectURL(file)}
                                            download={file.name}
                                            className="download-link"
                                        >
                                            {file.name}
                                        </a>) : ("")}

                                    <RxCross2
                                        onClick={() => handleDeleteMedia('files', index)}
                                        className="absolute top-0 right-0 text-red-500 cursor-pointer w-6 h-6 bg-white rounded-full z-10"
                                    />
                                </div>
                            </div>
                        </section>

                    ))}
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
                            accept="*/*"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />


                    </section>
                    <div>

                        <section className="p-4 flex gap-4">
                            <CiFaceSmile onClick={handleEmojis} className="w-6 h-6 fill-green-800 mt-1" />
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
                            <div className="p-1 bg-blue-800 rounded-full">
                                <IoIosSend className="w-6 h-6 fill-white" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}
