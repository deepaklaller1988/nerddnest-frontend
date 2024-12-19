import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare, BiSolidLike } from "react-icons/bi";
import { IoPaperPlaneSharp } from "react-icons/io5";
import {
  MdMoreHoriz,
  MdOutlineLinkedCamera,
  MdOutlineModeComment,
} from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useAPI";
import { useSelector } from "react-redux";
import { toasterError, toasterInfo, toasterSuccess } from "./Toaster";
import { FaTrash } from "react-icons/fa6";
import { uploadMultiFile } from "./UploadFile";
import { CgLayoutGrid } from "react-icons/cg";
import MiniLoader from "../Loaders/Miniloader";
import { RxCross2 } from "react-icons/rx";

type LikeData = {
  count: number;
  users: { firstname: string; lastname: string; handle: string }[];
};

const CommentSection = ({ id, data, isActive, commentsCount, updateCommentsCount }: any) => {
  const { API } = useApi();
  const userId = useSelector((state: any) => state.auth.id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [commentsData, setCommentsData] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [replyComment, setReplyComment] = useState<string>("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [likeComment, setLikeComment] = useState<any>(false)
  const [innerCommentLike, setInnerCommentLike] = useState<{ [key: string]: LikeData }>({});
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<any>({ mediaUrl: [] });
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isActive && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      getAllCommentData(id);
    }
  }, [id, isActive]);



  const toggleDeleteButton = (index: number) => {
    setDeleteButtonIndex(deleteButtonIndex === index ? null : index);
  };

  const getAllCommentData = async (postId: any) => {
    try {
      const { success, error, data } = await API.get(
        `posts/get-comments?postId=${postId}`
      );
      if (success) {
        setCommentsData(data);
        data.forEach((comment: any) => {
          setLikeComment((prev: any) => ({
            ...prev,
            [comment.id]: comment.likes_count > 0, // Set like status based on the count
          }));
        });
      } else {
        toasterError(error || "Failed to load comments");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      toasterError("An error occurred while fetching comments");
    }
  };

  const postComment = async (comment: string) => {
    if (!comment.trim() && images.length === 0 && videos.length === 0 && files.length === 0) {
      toasterError("Please enter a comment or add media."); // Notify the user
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
        setComment("");
        setImages([])
        setVideos([])
        setFiles([])
        getAllCommentData(id);
        updateCommentsCount(id, commentsCount + 1);
      } else {
        toasterError(error || "Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      toasterError("An error occurred while posting the comment");
    }
  };

  const postReplyComment = async (commentId: any) => {
    if (!replyComment.trim()) return;
    try {
      const { success, error } = await API.post("posts/reply-comment", {
        postId: id,
        commenterId: userId,
        comment: replyComment,
        commentId,
      });
      if (success) {
        setReplyComment("");
        setActiveReplyId(null);
        getAllCommentData(id);
      } else {
        toasterError(error || "Failed to post reply");
      }
    } catch (err) {
      console.error("Error posting reply:", err);
      toasterError("An error occurred while posting the reply");
    }
  };

  const handleDelete = async (commentId: any) => {
    try {
      const response = await API.delete(`posts/delete-comment`, { id: commentId });
      if (response.success) {
        toasterSuccess("Comment has been deleted successfully");
        setCommentsData((prevComments: any) =>
          prevComments.filter((comment: any) => comment.id !== commentId)
        );
        updateCommentsCount(id, commentsCount - 1);
        setDeleteButtonIndex(null);
      } else {
        toasterError("Failed to delete the comment");
      }
    } catch (error) {
      toasterError("An error occurred while deleting the comment");
    }
  };

  const handleLikeComments = async (commentId: string) => {
    const newLikeStatus = !likeComment[commentId];

    const { success, data, error } = await API.post("posts/like-comment", { commentId, userId });
    if (success) {
      // Update the like state for this specific comment
      setLikeComment((prevState: any) => ({
        ...prevState,
        [commentId]: newLikeStatus // Mark this comment as liked
      }));
      getAllLikes(commentId)
      toasterSuccess(data.message, 1000, "id")
    } else {
      // Handle failure if needed (optional)
    }
  };


  const getAllLikes = async (commentId: any) => {
    const { success, data, error, count } = await API.get(`posts/get-likes-comment?commentId=${commentId}`);
    if (success) {
      setInnerCommentLike((prevState) => ({
        ...prevState,
        [commentId]: {
          users: data?.map((like: any) => like.user),
          count: data?.length,
        },
      }));
    } else {
      console.error(error);
    }
  };


  const getFileCount = (name: string): number => {
    if (name === "images") return images.length;
    if (name === "video") return videos.length;
    if (name === "document") return files.length;
    return 0;
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

  const handleMediaTypeSelection = (type: string) => {
    if (type === 'image' && imageInputRef.current) {
      imageInputRef.current.click(); // Open image file selection dialog
    } else if (type === 'videos' && videoInputRef.current) {
      videoInputRef.current.click(); // Open video file selection dialog
    } else if (type === 'files' && fileInputRef.current) {
      fileInputRef.current.click(); // Open document file selection dialog
    }
  };

  const handleDeleteMedia = (type: string, index: number) => {
    if (type === 'images') {
      setImages(images.filter((_, i) => i !== index)); // Remove image
    } else if (type === 'video') {
      setVideos(videos.filter((_, i) => i !== index)); // Remove video
    } else if (type === 'files') {
      setFiles(files.filter((_, i) => i !== index)); // Remove file
    }
  };

  return (
    <>
      {isActive && (
        <div className="mt-3 border-t border-gray-500/20">
          {commentsData.map((commentData: any, index: number) => (
            <div key={commentData.id} className="w-full py-4">
              <div className="w-full">
                <div className="flex items-start gap-2">
                  <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block  border-2 border-black/5 border-white">
                    <img
                      className="w-full h-full bg-cover rounded-full"
                      src="/logo.png"
                      alt="logo"
                    />
                  </span>
                  <div className="max-w-full">
                    <div className={`max-w-full ${activeReplyId === commentData.id ? "mainReply" : ""}`}>
                      <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-2 rounded-[12px]">
                        <p>
                          <b className="text-white font-[600]">
                            {commentData.commenter?.firstname || "Anonymous"}
                          </b>
                        </p>

                        {/* <p>{commentData.comment}</p> */}
                         <p>{commentData.comment ? commentData.comment :""}</p>
                        {commentData.content_type == "images" &&
                          <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
                            {commentData.media_url?.length > 0 && commentData.media_url?.map((image: any, index: any) => (
                              <div key={index} className="relative uploaded-dataInner">
                                <img
                                  src={image}
                                  alt={`uploaded-image-${index}`}
                                  className="object-cover rounded-lg w-full h-full"
                                />


                              </div>
                            ))}

                          </div>
                        }
                        {commentData.content_type === "video" && (
                          <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
                            {commentData.media_url.map((videoUrl: any, index: any) => (
                              <div key={index} className="relative uploaded-dataInner">
                                <video controls className="object-cover rounded-lg w-full h-full">
                                  <source src={videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ))}
                          </div>
                        )}
                      </span>
                      <div className="w-full flex items-center gap-3 mt-2">
                        <span
                          className={`cursor-pointer ${likeComment[commentData.id] ? 'text-green-600' : 't'} hover:underline`}
                          onClick={() => handleLikeComments(commentData.id)}
                        >
                          {likeComment[commentData.id] ? 'Unlike' : 'Like'}
                        </span>


                        <span className="cursor-pointer hover:underline" onClick={() => setActiveReplyId(commentData.commenter.id)}>
                          Reply
                        </span>
                        <span className="text-sm text-white/30">
                          {new Date(commentData.createdAt).toLocaleDateString()}
                        </span>
                        {likeComment[commentData.id] && (<span className="bg-blue-500 p-1 rounded-full">
                          <BiSolidLike className="fill-white" />
                        </span>)}
                      </div>
                    </div>

                    {commentData.replies &&
                      commentData.replies.map((reply: any) => (
                        <div className="flex items-start gap-2 mt-4 innerReply" key={reply.id}>
                          <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block  border-2 border-black/5 border-white">
                            <img
                              className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                              src="/logo.png"
                              alt="logo"
                            />
                          </span>
                          <div className="max-w-full">
                            <div className="max-w-full">
                              <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-2 rounded-[12px]">
                                <p>
                                  <b>{reply.commenterName || "Anonymous"}</b>
                                </p>
                                <p>{reply.comment}</p>
                              </span>
                              <div className="w-full flex items-center gap-3 mt-2">
                                <span className="cursor-pointer text-green-600 hover:underline">
                                  Like
                                </span>
                                <span className="cursor-pointer hover:underline">Reply</span>
                                <span className="text-sm text-black/30">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                                <span className="bg-blue-500 p-1 rounded-full">
                                  <BiSolidLike className="fill-white" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <span onClick={() => handleDelete(reply.id)} className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10  items-center justify-center rounded-lg cursor-pointer block border-2 border-black/5 border-white">
                            <MdMoreHoriz className="w-6 h-6" />
                          </span>
                        </div>
                      ))}
                  </div>

                  {commentData.commenter_id == userId && <span className="relative w-6" onClick={() => toggleDeleteButton(index)}
                  >
                    <MdMoreHoriz className="w-6 h-6" />
                    {deleteButtonIndex === index && (
                    <div className="absolute w-[80px]  rounded-lg top-5 right-0 justify-center p-1 bg-gray-500/5 text-center shadow-lg">
                      <button
                        onClick={() => handleDelete(commentData.id)}
                        className="flex items-center text-white"
                      >
                        <FaTrash className="fill-white mr-2" /> Delete
                      </button>
                    </div>
                  )}
                  </span>}
                  
                </div>
              </div>
            </div>
          ))}

          <div className="w-full">
            <section className="flex gap-3 cursor-pointer py-4">
              <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                <img
                  className="w-full block h-full"
                  src="/dp.jpg"
                  alt="user"
                />
              </span>


              {/* working */}
              <section className="bg-white/5 rounded-[12px] w-full pt-2 relative">
                <textarea
                  className="resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                  ref={textareaRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                  <IoPaperPlaneSharp className="fill-white" onClick={() => postComment(comment)} />
                </button>
                <section className="p-2 pb-4">
                {isUploadLoading && <MiniLoader />}
            <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
              {images.length > 0 && images.map((image, index) => (
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
              ))}

            </div>
            <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
              {videos.length > 0 && videos.map((video, index) => (
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
              ))}
            </div>
            <div className="relative mt-4 grid grid-cols-5 gap-2 uploaded-data">
              {files.length > 0 && files.map((file, index) => (
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
              ))}
            </div>
                </section>
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

              </section>

              {/* done */}
            </section>
          </div>
        </div>

      )}
    </>
  );
};

export default CommentSection;



