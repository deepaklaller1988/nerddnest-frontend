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
import { useState } from "react";
import Link from "next/link";


interface Reply {
  id: string;
  like: number;
  userName: string;
  replyText: string;
  timeAgo: string;
  avatar: string;
}

interface Comment {
  id: string;
  userName: string;
  commentText: string;
  timeAgo: string;
  avatar: string;
  like: number;
  replies: Reply[];
}
const CommentSection = () => {
  const [showCommentSection, setShowCommentSection] = useState(false);

  const commentsData: Comment[] = [
    {
      id: "1",
      userName: "Preety Marcos",
      commentText:
        "We’re thrilled to have you join our community of gamers, streamers, and creators!",
      timeAgo: "1 day ago",
      avatar: "/logo.png",
      like: 3,
      replies: [
        {
          id: "1.1",
          like: 1,
          userName: "Jane Smith",
          replyText: "Welcome! Excited to be here.",
          timeAgo: "10 hours ago",
          avatar: "/logo.png",
        },
        {
          id: "1.2",
          userName: "Alice Johnson",
          replyText: "Looking forward to connecting with you!",
          timeAgo: "8 hours ago",
          avatar: "/logo.png",
          like: 1,

        },
      ],
    },
  ];
  const handleCommentClick = () => {
    if (commentsData.length === 0) {
      setShowCommentSection(!showCommentSection);
    }
  };
  return (
    <>
    <div className="w-full border-t border-gray-500/20 py-4">
      <section className="w-full flex items-center gap-2 justify-between">
        <Link
          href=""
          onClick={handleCommentClick}
          className="flex items-center gap-2 text-green-600"
        >
          <BiSolidLike className="fill-green-600 w-5 h-5" /> Like
        </Link>
        <button className="flex items-center gap-2">
          <MdOutlineModeComment className="w-5 h-5" /> Comment
        </button>
      </section>

      <div className="mt-3 border-t border-gray-500/20">
        {commentsData.length > 0 ? (
          commentsData.map((comment) => (
            <div  key={comment.id}>
              <div  className="w-full py-4">
                <div className="w-full">
                  <div className="flex items-start gap-2">
                    <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                      <img
                        className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                        src={comment.avatar}
                        alt="user"
                      />
                    </span>
                    <div className="max-w-full">
                      <div className="max-w-full mainReply">
                        <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                          <p>
                            <b className="text-white font-[600]">
                              {comment.userName}
                            </b>
                          </p>
                          <p>{comment.commentText}</p>
                        </span>
                        <div className="w-full flex items-center gap-3 mt-2">
                          <span className="cursor-pointer text-green-600 hover:underline">
                            Like ({comment.like})
                          </span>
                          <span className="cursor-pointer hover:underline">
                            Reply
                          </span>
                          <span className="text-sm text-gray-500/50">
                            {comment.timeAgo}
                          </span>
                          <span className="bg-blue-500 p-1 rounded-full">
                            <BiSolidLike className="fill-white" />
                          </span>
                        </div>
                      </div>

                      {comment.replies.length > 0 &&
                        comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-2 mt-4 innerReply"
                          >
                            <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                              <img
                                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                                src={reply.avatar}
                                alt="user"
                              />
                            </span>
                            <div className="max-w-full">
                              <div className="max-w-full">
                                <span className="inline-block min-w-[200px] max-w-full bg-gray-500/5 p-4 rounded-[12px]">
                                  <p>
                                    <b className="text-white font-[600]">
                                      {reply.userName}
                                    </b>
                                  </p>
                                  <p>{reply.replyText}</p>
                                </span>
                                <div className="w-full flex items-center gap-3 mt-2">
                                  <span className="cursor-pointer text-green-600 hover:underline">
                                    Like ({reply.like})
                                  </span>
                                  <span className="cursor-pointer hover:underline">
                                    Reply
                                  </span>
                                  <span className="text-sm text-gray-500/50">
                                    {reply.timeAgo}
                                  </span>
                                  <span className="bg-blue-500 p-1 rounded-full">
                                    <BiSolidLike className="fill-white" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block">
                              <MdMoreHoriz className="w-6 h-6" />
                            </span>
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
                          <section className="bg-black/30 rounded-[12px] w-full pt-2 relative">
                            <textarea
                              className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                              placeholder="Write a comment..."
                            ></textarea>
                            <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                              <IoPaperPlaneSharp className="fill-white" />
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
                                <BiBarChartSquare className="w-6 h-6 fill-white" />
                              </span>
                            </section>
                          </section>
                        </section>
                      </div>
                    </div>

                    <span className="hover:bg-gray-500/5 relative min-h-10 min-w-10 max-w-10 flex items-center justify-center rounded-lg cursor-pointer block">
                      <MdMoreHoriz className="w-6 h-6" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <section className="flex gap-3 cursor-pointer py-4">
                  <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                    <img
                      className="w-full block h-full"
                      src="/dp.jpg"
                      alt="user"
                    />
                  </span>
                  <section className="bg-black/30 rounded-[12px] w-full pt-2 relative">
                    <textarea
                      className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                      placeholder="Write a comment..."
                    ></textarea>
                    <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                      <IoPaperPlaneSharp className="fill-white" />
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
                        <BiBarChartSquare className="w-6 h-6 fill-white" />
                      </span>
                    </section>
                  </section>
                </section>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">
            <section className="flex gap-3 cursor-pointer py-4">
              <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
                <img className="w-full block h-full" src="/dp.jpg" alt="user" />
              </span>
              <section className="bg-black/5 rounded-[12px] w-full pt-2 relative">
                <textarea
                  className="text-black resize-none bg-transparent w-full p-2 px-5 flex items-center text-gray-500/70"
                  placeholder="Write a comment..."
                ></textarea>
                <button className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 bg-[var(--highlight-blue)] rounded-full">
                  <IoPaperPlaneSharp className="fill-white" />
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
                    <BiBarChartSquare className="w-6 h-6 fill-white" />
                  </span>
                </section>
              </section>
            </section>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default CommentSection;
