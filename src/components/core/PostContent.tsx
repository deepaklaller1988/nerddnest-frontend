import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { LuPin } from "react-icons/lu";
import { MdMoreHoriz } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";

import { useSelector } from "react-redux";
import { useApi } from "@/hooks/useAPI";
import DeletePopup from "../Modals/DeleteConfirmation";
import { toasterError, toasterSuccess } from "./Toaster";
import { PostActionsMenu } from "@/lib/MenuBar/PostActionsMenu ";
import { FeedVisiblityMenu } from "@/lib/MenuBar/FeedVisibiltyMenu";
import Image from "next/image";
import { timeAgo } from "@/utils/timeAgo";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { capitalizeName } from "@/utils/capitalizeName";
import { selectPostedData } from '../../redux/slices/data.slice';
import Loader from "../Loaders/Loader";


export default function PostContent() {
  const { API } = useApi()
  const router = useRouter()
  const userId = useSelector((state: any) => state.auth.id);
  const postVisibilityRef = useRef<HTMLDivElement | null>(null);
  const postActionsRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isVisiblityLoader, setIsVisibilityLoader] = useState(false);

  const [loading, setLoading] = useState(false);
  const [PostData, setPostData] = useState<any>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [openPostVisibilityIndex, setOpenPostVisibiltyIndex] = useState<number | null>(null);
  const [openPostActionMenuIndex, setOpenPostActionMenuIndex] = useState<number | null>(null);
  const postedData = useSelector(selectPostedData);

  useEffect(() => {
    if (userId) {
      getAllPosts()
    }
  }, [userId, postedData, page])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        openPostVisibilityIndex !== null &&
        postVisibilityRef.current &&
        !postVisibilityRef.current.contains(target)
      ) {
        setOpenPostVisibiltyIndex(null);
      }

      if (
        openPostActionMenuIndex !== null &&
        postActionsRef.current &&
        !postActionsRef.current.contains(target)
      ) {
        setOpenPostActionMenuIndex(null);
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, [openPostVisibilityIndex, openPostActionMenuIndex]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [loading]);

  const getAllPosts = async () => {
    if (loading) return;
    setLoading(true);

    const { success, error, data } = await API.get(
      `posts/fetch?userId=${userId}&page=${page}`
    );

    if (success) {
      setPostData((prevData: any) => [
        ...data.map((post: any) => ({
          ...post,
          isCommentingEnabled: post.is_commenting_enabled,
          pinned: post.is_pinned,
        })),
      ]);

    } else {
      console.log(error);
    }
    setLoading(false);
  };
  const updateVisibilty = async (id: any, userId: any, visibility: any) => {
    setIsVisibilityLoader(true);
    try {
      const { success, error } = await API.put(
        "posts/change-visibility",
        { id, userId, visibility }
      );

      if (success) {
        setPostData((prevData: any) =>
          prevData.map((post: any) =>
            post.id === id ? { ...post, visibility } : post
          )
        );
      } else {
        console.log(error);
        setIsVisibilityLoader(false);
      }
    } catch (error) {
      console.error('Error while posting:', error);
      setIsVisibilityLoader(false);
    } finally {
      setIsVisibilityLoader(false);
    }
  };

  const handleItemClick = async (id: any, userId: any, name: any) => {
    setOpenPostVisibiltyIndex(null);
    await updateVisibilty(id, userId, name);
  };


  const handleImageClick = (id: number) => {
    router.push(`/postdetails?id=${id}`);
  };

  const handleMouseLeave = () => setHoveredIndex(null);
  const handleMouseEnter = (index: number) => setHoveredIndex(index);

  const handleDeleteClick = (id: number) => {
    setDeleteItemId(id);
    setIsDeletePopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
  };

  const handleToggleCommenting = async (data: any) => {
    const newState = !data.isCommentingEnabled;
    try {
      const { success, error } = await API.put("posts/turn-off-comments", {
        id: data.id,
        userId: userId,
        isCommentEnabled: newState,
      });

      if (success) {
        setPostData((prevData: any) =>
          prevData.map((post: any) =>
            post.id === data.id
              ? { ...post, isCommentingEnabled: newState }
              : post
          )
        );
        setOpenPostActionMenuIndex(null)
        toasterSuccess(newState ? "Comments are Turn On SuccessFully." : "Comments are Turn Off SuccessFully.", 1000, "id")
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleTogglePin = async (data: any) => {
    const newState = !data.pinned;
    try {
      const { success, error } = await API.put("posts/pin-post", {
        id: data.id,
        userId: userId,
        pinned: newState,
      });


      if (success) {
        setPostData((prevData: any) =>
          prevData.map((post: any) =>
            post.id === data.id
              ? { ...post, pinned: newState }
              : post
          )
        );
        setOpenPostActionMenuIndex(null)
        toasterSuccess(newState ? "Pinned Post SuccessFully." : "UnPin Post SuccessFully.", 1000, "id")
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId === null) return;

    try {
      const response = await API.delete(`posts/delete`, { id: deleteItemId });
      if (response.success) {
        toasterSuccess("Post has been deleted successfully");
        getAllPosts()
      } else {
        toasterError("Failed to delete the post");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toasterError("An error occurred while deleting the post");
    } finally {
      setIsDeletePopupOpen(false);
      setDeleteItemId(null);
    }
  };
  // const handleTogglePin = () => setIsPinned((prev) => !prev);



  const getVisibilityIcon = (visibility: any) => {
    const selectedItem = FeedVisiblityMenu.find(item => item.name === visibility);
    return selectedItem ? selectedItem.Icon : null;
  };
  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-4">
        {isDeletePopupOpen && (
          <DeletePopup
            message="Are you sure you want to delete this post?"
            onDelete={handleConfirmDelete}
            onCancel={handleClosePopup}
          />
        )}

        {PostData && PostData.map((data: any, index: any) => {
          const postTypeMap: any = {
            content: "Shared an Update",
            image: "Posted an Image",
            video: "Posted a Video",
            document: "Shared a Document"

          };
          const postDescription = postTypeMap[data?.post_type] || "";
          return (
            <div key={index}>
              <section className="w-full bg-[var(--sections)] border border-white/5 rounded-[12px]">
                <section className="cursor-pointer flex items-start justify-between gap-4 p-4">
                  <div className="flex items-start gap-2">
                    <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                      <Image
                        className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                        src={data?.user?.image || "/profile-avatar-legacy-50.png"}
                        alt="logo"
                        height={20}
                        width={20}
                      />
                    </span>
                    <span className="w-full">
                      <p className="text-[12px]">
                        <b className="text-white font-[600] mr-1">
                          {capitalizeName(data?.user?.firstname)} {capitalizeName(data?.user?.lastname)}
                        </b>
                        {postDescription}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="text-[13px] bg-gray-500/5 flex items-center gap-2">
                          {timeAgo(data?.createdAt)}
                          {(() => {
                            const IconComponent = getVisibilityIcon(data?.visibility);
                            return IconComponent ? <IconComponent /> : null;
                          })()}

                        </div>
                        <section className="z-10 relative" ref={postVisibilityRef}>
                          {data.user_id === userId &&
                            <TiArrowSortedDown
                              onClick={() =>
                                setOpenPostVisibiltyIndex((prev: any) =>
                                  prev === index ? null : index
                                )
                              }
                            />
                          }
                          {openPostVisibilityIndex === index && (
                            <div className="shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[250px] py-2 rounded-lg bg-white absolute mt-1">
                              {FeedVisiblityMenu.map((item) => (
                                <button
                                  key={item.label}
                                  onClick={() => handleItemClick(data?.id, userId, item.name)}
                                  className={`${data?.visibility === item.name
                                    ? "drop bg-gray-500/10"
                                    : ""
                                    } hover:bg-gray-500/10 flex gap-2 items-center px-4 p-2 w-full text-left`}
                                >
                                  <item.Icon /> {item.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </section>
                      </div>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {data.user_id == userId && (
                      <span>
                        {data.pinned ? (
                          <LuPin
                            className="w-4 h-4 cursor-pointer"
                            onClick={handleTogglePin}
                          />
                        ) : (
                          ""
                        )}
                      </span>)
                    }

                    <div className="flex relative " ref={postActionsRef}>
                      {data.user_id == userId && <span>
                        <MdMoreHoriz
                          className="w-6 h-6"
                          onClick={() =>
                            setOpenPostActionMenuIndex((prev: any) =>
                              prev === index ? null : index
                            )
                          }
                        />
                      </span>}


                      {openPostActionMenuIndex === index && (
                        <div data-popup-type="postactions" className="!z-10 shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-[var(--bgh)] absolute mt-5 right-0">
                          {PostActionsMenu({
                            isPinned: data.pinned,
                            togglePin: () => handleTogglePin(data),
                            isCommentingEnabled: data.isCommentingEnabled,
                            toggleCommenting: () => handleToggleCommenting(data),
                            deleted: () => handleDeleteClick(data.id),

                          }).map(({ icon, label, onClick }, index) => (

                            <button
                              key={index}
                              className={`flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none ${hoveredIndex === index ? "drop" : ""
                                }`}
                              aria-label={label}
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                              onClick={onClick}
                            >
                              {icon} {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <div className="w-full px-4 flex flex-col gap-3">
                  <section className="flex flex-col gap-3">
                    <p>
                      {data.content}
                    </p>
                    <Link href="" className="text-[var(--highlight-blue)]">
                    </Link>

                    {data?.post_type === "image" && data?.media_url?.length > 0 && (
                      <section className={`stack w-full stack${data.media_url.length === 1 ? '' : data.media_url.length >= 2 && data.media_url.length <= 4 ? data.media_url.length : 4}`}>
                        {data.media_url.filter((url: string) => url && url.trim() !== "").slice(0, 4).map((url: any, index: any) => (
                          <section className="w-full" key={index}>
                            <Image
                              src={url}
                              className="block w-full rounded-lg"
                              alt={"Image"}
                              height={200}
                              width={200}
                              onClick={() => handleImageClick(data.id)}
                            />
                            {data.media_url.length > 4 && index == 3 && (
                              <span>4+</span>
                            )}
                          </section>
                        ))}
                      </section>
                    )}
                    {data?.post_type === "video" && data?.media_url?.length > 0 && (
                      <section className={`stack w-full stack${data.media_url.length === 1 ? '' : data.media_url.length >= 2 && data.media_url.length <= 4 ? data.media_url.length : 4}`}>
                        {data.media_url.slice(0, 4).map((url: any, index: any) => (
                          <section className="w-full" key={index}>
                            <video
                              className="w-full rounded-lg"
                              controls
                              height={200}
                              width={200}
                            >
                              <source src={url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            {data.media_url.length > 4 && index == 3 && (
                              <span>4+</span>
                            )}
                          </section>
                        ))}
                      </section>
                    )}
                    {data?.post_type === "document" && data?.media_url?.length > 0 && (
                      <div className="flex flex-wrap gap-4">
                        {data?.post_type === "document" && data?.media_url?.length > 0 && (
                          <div className="flex flex-wrap gap-4">
                            {data.media_url.map((url: any, index: any) => {
                              const fileExtension = url.split('.').pop()?.toLowerCase();
                              const fileName = url.split('/').pop();
                              return (
                                <div key={index} className="w-full flex items-center gap-2 border p-2 rounded-lg">
                                  <span className="text-gray-500">
                                    <IoDocumentTextOutline size={20} />
                                  </span>
                                  <span className="text-sm  bg-gray-500/5">{fileName}</span>
                                  {fileExtension === 'pdf' && (
                                    <a href={url} className="text-blue-500 underline ml-2" target="_blank" rel="noopener noreferrer">
                                      View PDF
                                    </a>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}


                    <div className="w-full mt-2 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 cursor-pointer">
                        {/* <span className="bg-blue-500 p-1 rounded-full">
                        <BiSolidLike className="fill-white" />
                      </span>{" "} */}
                        {/* Marcos, Alvin and 2 Others */}
                      </span>
                      <span className="cursor-pointer hover:text-white">
                        {/* 3 Comments */}
                      </span>
                    </div>
                    {/* <CommentSection /> */}
                  </section>
                </div>
              </section>
              {loading && <Loader />}
            </div>
          );
        })}
      </div>
    </>
  );
}
