import { useApi } from "@/hooks/useAPI";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import DeletePopup from "./DeleteConfirmation";
import { toasterError, toasterSuccess } from "../core/Toaster";
import EditPostModal from "./EditPostModal";
import { FeedVisiblityMenu } from "@/lib/MenuBar/FeedVisibiltyMenu";
type ViewAllScheduleModalProps = {
    isViewPopupOpen: any
    onClose: () => void;
    
};

const ViewAllScheduleModal = ({ onClose }: ViewAllScheduleModalProps) => {
    const { API } = useApi()
    const userId = useSelector((state: any) => state.auth.id);
    const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [currentPostId, setCurrentPostId] = useState<number | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (userId) {
            getScheduleData()
        }
    }, [userId])

    const getScheduleData = async () => {
        const { success, error, data } = await API.get(`posts/get-scheduled-posts?userId=${userId}`);
        if (success) {
            setScheduledPosts(data);
        } else {
            console.log(error);
        }
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId === null) return;
        if (userId) {
            try {
                const response = await API.delete(`posts/delete-scheduled-post`, { id: deleteItemId, userId });
                if (response.success) {
                    toasterSuccess("Scheduled Post has been deleted successfully");
                    getScheduleData()
                } else {
                    toasterError("Failed to delete the post");
                }
            } catch (error) {
                toasterError("An error occurred while deleting the post");
            } finally {
                setIsDeletePopupOpen(false);
                setDeleteItemId(null);
            }
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteItemId(id);
        setIsDeletePopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsDeletePopupOpen(false);
    };

    const openEditModal = (postId: number) => {
        setCurrentPostId(postId);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentPostId(null);
    };


    return (
        <>

            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center ">
                {isDeletePopupOpen && (
                    <DeletePopup
                        message="Are you sure you want to delete this Scheduled post?"
                        onDelete={handleConfirmDelete}
                        onCancel={handleClosePopup}
                    />
                )}
                {isEditModalOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
                    >
                        <EditPostModal
                            postId={currentPostId!}
                            onClose={closeEditModal}

                        />
                    </div>
                )}

                <div className="max-h-[80vh] overflow-auto bg-[var(--sections)] border border-white/10 w-full max-w-[600px] rounded-[12px] shadow-lg">
                    <div className="flex items-center justify-between  p-4 border-b border-white/5">
                        <h2 className="uppercase font-semibold text-center block text-white">Scheduled Posts</h2>
                        <button type="button" onClick={onClose} className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white">&times;</button>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {scheduledPosts.length > 0 ? (
                            scheduledPosts.map((post) => {
                                const visibilityIcon: any = FeedVisiblityMenu.find(item => item.name === post.visibility)?.Icon;

                                return (
                                    <div key={post.id} className="w-full flex flex-col gap-3 rounded-lg bg-white/10 p-4">
                                        <section className="cursor-pointer flex items-center gap-2 pr-14 relative">
                                            <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                                                <img className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full" src={post.user.image || '/logo.png'} alt="User" />
                                            </span>
                                            <span className="w-full">
                                                <p className="text-[12px]">
                                                    <b className="text-white font-semibold">{post.user.firstname} {post.user.lastname}</b> Posted an update
                                                </p>
                                                <p className="text-[12px] text-white">
                                                    <b className="font-semibold text-white">Schedule for:</b> {new Date(post.schedule_time).toLocaleString()}
                                                    {/* {visibilityIcon && <visibilityIcon className="fill-white inline-block ml-1" />} */}
                                                    {visibilityIcon && React.createElement(visibilityIcon, { className: "fill-white inline-block ml-1" })}

                                                </p>
                                            </span>
                                            <span className="flex absolute top-2 right-0 gap-3">
                                                <button type="button">
                                                    <MdEdit type="button" onClick={() => openEditModal(post.id)} size="16" className="hover:fill-white duration-[.5s]" />
                                                </button>
                                                <button type="button">
                                                    <MdDeleteForever type="button" size="16" className="hover:fill-white duration-[.5s]" onClick={() => handleDeleteClick(post.id)} />
                                                </button>
                                            </span>
                                        </section>
                                        <p>{post.content}</p>
                                        {post.media_url && post.media_url.length > 0 && (
                                            <div className="mt-2">
                                                {post.media_url.map((media: any, index: any) => (
                                                    <img key={index} src={media} alt={`media-${index}`} className="w-full h-auto" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-white">No scheduled posts found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
        // <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center ">
        //     <div className="max-h-[80vh] overflow-auto bg-[var(--sections)] border border-white/10 w-full max-w-[600px] rounded-[12px] shadow-lg">
        //         <div className="flex items-center justify-between  p-4 border-b border-white/5">
        //             <h2 className=" uppercase font-semibold text-center block text-white">Scheduled Posts</h2>
        //             <button onClick={onClose} className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white">&times;</button>
        //         </div>
        //         <div className="p-4 flex flex-col gap-3">
        //             <div className='w-full flex flex-col gap-3 rounded-lg bg-white/10 p-4'>
        //                 <section className='cursor-pointer flex items-center gap-2 pr-14 relative'>
        //                     <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
        //                         <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
        //                     </span>
        //                     <span className='w-full'>
        //                         <p className='text-[12px]'>
        //                             <b className='text-white font-semibold'>Preety Marcos</b> Posted an update</p>
        //                         <p className='text-[12px] text-white'><b className="font-semibold text-white">Schedule for:</b> December 9, 2024 at 12:00 pm <GoGlobe className="fill-white inline-block" /></p>
        //                     </span>
        //                     <span className="flex absolute top-2 right-0 gap-3">
        //                         <button><MdEdit size="16" className="hover:fill-white duration-[.5s]" /></button>
        //                         <button><MdDeleteForever size="16" className="hover:fill-white duration-[.5s]" /></button>
        //                     </span>
        //                 </section>
        //                 <p>Uptodown is a multi-platform app store specialized in Android. Our goal is to provide free and open access to a large catalog of apps without restrictions</p>
        //                 <p>while providing a legal distribution platform accessible from any browser, and also through its official native app.</p>
        //             </div>
        //             <div className='w-full flex flex-col gap-3 rounded-lg bg-white/10 p-4'>
        //                 <section className='cursor-pointer flex items-center gap-2 pr-14 relative'>
        //                     <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
        //                         <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
        //                     </span>
        //                     <span className='w-full'>
        //                         <p className='text-[12px]'>
        //                             <b className='text-white font-semibold'>Preety Marcos</b> Posted an update</p>
        //                         <p className='text-[12px] text-white'><b className="font-semibold text-white">Schedule for:</b> December 9, 2024 at 12:00 pm <GoGlobe className="fill-white inline-block" /></p>
        //                     </span>
        //                     <span className="flex absolute top-2 right-0 gap-3">
        //                         <button><MdEdit size="16" className="hover:fill-white duration-[.5s]" /></button>
        //                         <button><MdDeleteForever size="16" className="hover:fill-white duration-[.5s]" /></button>
        //                     </span>
        //                 </section>
        //                 <p>Uptodown is a multi-platform app store specialized in Android. Our goal is to provide free and open access.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ViewAllScheduleModal;
