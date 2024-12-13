import { useApi } from '@/hooks/useAPI';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toasterError, toasterSuccess } from '../core/Toaster';

export default function FriendsContent() {
    const { API } = useApi();
    const userId = useSelector((state: any) => state.auth.id);
    const [requestData, setRequestData] = useState<any>([]);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (userId && isClient) {
            getAllRequests();
        }
    }, [userId, isClient]);

    const onAcceptRejectRequest = async (id: any, friendId: number, userid: any, name: any) => {
        try {
            const { success, error } = await API.put('friends/accept-request', {
                id,
                userId: userid,
                friendId,
                status: name,
            });
            if (success) {
                toasterSuccess("Friend request accepted");
                getAllRequests();
            } else {
                toasterError(error || "Failed to accept the friend request");
            }
        } catch (err) {
            toasterError("An error occurred while accepting the friend request");
        }
    };

    const getAllRequests = async () => {
        try {
            const { success, error, data } = await API.get(
                `friends/pending-requests?userId=${userId}`
            );
            if (success) {
                setRequestData(data);
            } else {
                toasterError(error || "Failed to load requests");
            }
        } catch (err) {
            toasterError("An error occurred while fetching requests");
        }
    };


    return (
        isClient ?
            <>
                <div className='w-full pt-2'>
                    <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
                        <div className='w-full rounded-[12px] bg-[var(--sections)] border border-white/5'>
                            <div className='w-full'>
                                <div className='w-full border-t border-white/5 p-8 py-0 flex gap-6 items-center'>
                                    <button className='text-white font-semibold border-b border-white py-4'>Requests</button>
                                </div>
                                {requestData && requestData.length > 0 ? (
                                    requestData.map((item: any) => {
                                        return (
                                            <section key={item.id} className='w-full bg-[var(--sections)] border border-white/5 rounded-[12px]'>
                                                <section className='cursor-pointer flex items-start justify-between gap-4 p-4'>
                                                    <div className='flex items-start gap-2'>
                                                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                                                            <img src={item.user.image || "/profile-avatar-legacy-50.png"} alt="profile" className='w-full h-full object-cover rounded-full' />
                                                        </span>
                                                        <span className='w-full'>
                                                            <p className='flex flex-col text-[12px]'>
                                                                <b className='text-white font-[600] mr-1'>{item.user.firstname} {item.user.lastname}</b>
                                                                <span className='text-gray-400 text-xs'>sent you a friend request</span>
                                                            </p>
                                                        </span>
                                                    </div>
                                                    <div className='flex gap-4'>
                                                        <button
                                                            onClick={() => onAcceptRejectRequest(item.id, item?.friend_id, item.user?.id, "Accepted")}
                                                            className='bg-[var(--highlight)] text-white text-sm font-semibold p-2 rounded-lg flex gap-1 items-center justify-center'>
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => onAcceptRejectRequest(item.id, item?.friend_id, item.user?.id, "Rejected")}
                                                            className='bg-red-500 text-white py-2 px-6 rounded-[6px] text-sm font-semibold hover:bg-red-600 transition duration-200'>
                                                            Ignore
                                                        </button>
                                                    </div>
                                                </section>
                                            </section>
                                        );
                                    })) : (
                                    <section className='w-full bg-[var(--sections)] border border-white/5 rounded-[12px]'>
                                        <section className='cursor-pointer flex items-start justify-between gap-4 p-4'>
                                            You have no pending requests to connect.
                                        </section>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </> : ("")
    );
}
