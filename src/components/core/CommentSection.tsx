"use client"
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
import { FaTrashAlt } from "react-icons/fa";

const CommentSection = ({ id, data, user_id, isActive, comments }: any) => {
  const { API } = useApi();
  const userId = useSelector((state: any) => state.auth.id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [commentsData, setCommentsData] = useState<any>([]); // Main comments with their replies
  const [comment, setComment] = useState<string>(""); // For the main comment input
  const [replyComment, setReplyComment] = useState<string>(""); // For the reply input
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null); // Tracks which comment is being replied to
  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(null); // For toggling delete options

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

  const toggleDeleteButton = (index: any) => {
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

  const handleDelete = async (id: any) => {
    try {
      const response = await API.delete(`posts/delete-comment`, { id });
      if (response.success) {
        toasterSuccess("Comment has been deleted successfully");
        setCommentsData((prevComments: any) =>
          prevComments.filter((comment: any) => comment.id !== id)
        );
        setDeleteButtonIndex(null);
      } else {
        toasterError("Failed to delete the comment");
      }
    } catch (error) {
      toasterError("An error occurred while deleting the comment");
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
                  <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                    <img
                      className="w-full h-full bg-cover rounded-full"
                      src="/logo.png"
                      alt="logo"
                    />
                  </span>
                  <div className="max-w-full">
                    <div className="max-w-full mainReply">
                      <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                        <p>
                          <b className="text-[var(--highlight)] font-[600]">
                            {commentData.commenterName || "Anonymous"}
                          </b>
                        </p>
                        <p>{commentData.comment}</p>
                      </span>
                    </div>
                    <div className="w-full flex items-center gap-3 mt-2">
                      <span
                        className="cursor-pointer text-green-600 hover:underline"
                        onClick={() => setActiveReplyId(commentData.id)}
                      >
                        Reply
                      </span>
                      <span className="text-sm text-white/30">
                        {new Date(commentData.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Reply Input */}
                    {activeReplyId === commentData.id && (
                      <div className="flex gap-3 mt-3">
                        <textarea
                          className="w-full p-2 border rounded-lg"
                          placeholder="Write a reply..."
                          value={replyComment}
                          onChange={(e) => setReplyComment(e.target.value)}
                        />
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                          onClick={() => postReplyComment(commentData.id)}
                        >
                          Reply
                        </button>
                      </div>
                    )}

                    {/* Inner Comments (Replies) */}
                    {commentData.replies &&
                      commentData.replies.map((reply: any) => (
                        <div
                          key={reply.id}
                          className="ml-8 mt-4 bg-gray-200 p-2 rounded-md"
                        >
                          <p>
                            <b>{reply.commenterName || "Anonymous"}</b>
                          </p>
                          <p>{reply.comment}</p>
                          <span className="text-sm text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Main Comment Input */}
          <div className="w-full mt-4">
            <textarea
              ref={textareaRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Write a comment..."
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => postComment(comment)}
            >
              Post Comment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSection;



