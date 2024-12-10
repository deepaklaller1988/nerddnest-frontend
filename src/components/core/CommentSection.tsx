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
import { toasterError, toasterSuccess } from "./Toaster";

const CommentSection = ({ id, data, isActive, commentsCount, updateCommentsCount }: any) => {
  const { API } = useApi();
  const userId = useSelector((state: any) => state.auth.id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [commentsData, setCommentsData] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [replyComment, setReplyComment] = useState<string>("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [likeComment, setLikeComment] = useState(false)
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
      } else {
        toasterError(error || "Failed to load comments");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      toasterError("An error occurred while fetching comments");
    }
  };

  const postComment = async (comment: string) => {
    if (!comment.trim()) return;
    try {
      const { success, error } = await API.post("posts/comment", {
        postId: id,
        commenterId: userId,
        comment,
      });
      if (success) {
        setComment("");
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

  const handleLikeComments = async () => {

  }

  return (
    <>
      {isActive && (
        <div className="mt-3 border-t border-gray-500/20">
          {commentsData.map((commentData: any, index: number) => (
            <div key={commentData.id} className="w-full py-4">
              <div className="w-full">
                <div className="flex items-start gap-2">
                  <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                    <img
                      className="w-full h-full bg-cover rounded-full"
                      src="/logo.png"
                      alt="logo"
                    />
                  </span>
                  <div className="max-w-full">
                    <div className={`max-w-full ${activeReplyId === commentData.id ? "mainReply" : ""}`}>
                      <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                        <p>
                          <b className="text-[var(--highlight)] font-[600]">
                            {commentData.commenter?.firstname || "Anonymous"}
                          </b>
                        </p>
                        <p>{commentData.comment}</p>
                      </span>
                      <div className="w-full flex items-center gap-3 mt-2">
                        <span className="cursor-pointer text-green-600 hover:underline" onClick={handleLikeComments}>
                          Like
                        </span>
                        <span className="cursor-pointer hover:underline" onClick={() => setActiveReplyId(commentData.id)}>
                          Reply
                        </span>
                        <span className="text-sm text-white/30">
                          {new Date(commentData.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-blue-500 p-1 rounded-full">
                          <BiSolidLike className="fill-white" />
                        </span>
                      </div>
                    </div>

                    {commentData.replies &&
                      commentData.replies.map((reply: any, index: any) => (
                        <div className="flex items-start gap-2 mt-4 innerReply" key={reply.id}>
                          <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                            <img
                              className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                              src="/logo.png"
                              alt="logo"
                            />
                          </span>
                          <div className="max-w-full">
                            <div className="max-w-full">
                              <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
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
                          <span onClick={() => handleDelete(reply.id)} className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                            <MdMoreHoriz className="w-6 h-6" />
                          </span>
                        </div>
                      ))}
                  </div>

                  {commentData.commenter_id == userId && <span onClick={() => toggleDeleteButton(index)} className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block border border-2 border-black/5 border-white">
                    <MdMoreHoriz className="w-6 h-6" />
                  </span>}
                  {deleteButtonIndex === index && (
                    <div className="top-0 right-0 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <button
                        onClick={() => handleDelete(commentData.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
              <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
                <textarea
                  className="text-white/50 resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                  ref={textareaRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                  <IoPaperPlaneSharp className="fill-white" onClick={() => postComment(comment)} />
                </button>
                <section className="p-4 pt-0 flex gap-4">
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
              </section>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSection;



