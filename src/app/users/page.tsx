"use client"
import ProfileDetailCard from '@/components/Cards/ProfileDetailCard'
import { toasterError, toasterSuccess } from '@/components/core/Toaster';
import { useApi } from '@/hooks/useAPI';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BiUserPlus } from 'react-icons/bi'
import { useSelector } from 'react-redux';

export default function UserProfile() {
    const { API } = useApi()
    const searchParams = useSearchParams();
    const FriendId = searchParams.get("id");
    const userId = useSelector((state: any) => state.auth.id);

    const [data, setData] = useState<any>([])

    useEffect(() => {
        if (FriendId && userId) {
            getPostData()
        }
    }, [FriendId, userId])

    const getPostData = async () => {
        const { success, error, data } = await API.get(`friends/friend-profile?userId=${userId}&friendId=${FriendId}`);
        if (success) {
            setData(data)
        }
        else {
            console.log(error);
        }
    };

    const connectUser = async () => {
        try {
            const { success, error } = await API.post("friends/send-request", {
                userId, friendId: "126"
            });
            if (success) {
                setData((prev: any) => ({
                    ...prev,
                    request_status: 'Pending',
                }));
                toasterSuccess("Send Friend Request SuccessFully !", 2000, "id")              
            } else {
                toasterError(error || "Failed to post comment");
            }
        } catch (err) {
            console.error("Error posting comment:", err);
            toasterError("An error occurred while posting the comment");
        }
    };

    const cancelRequest = async () => {
        try {
            const { success, error } = await API.delete('friends/cancel-request', {
                    userId,
                    friendId: FriendId,
            });
            if (success) {
                toasterSuccess('Friend request cancelled successfully!', 2000, 'id');
                setData((prev: any) => ({
                    ...prev,
                    request_status: null,
                }));
            } else {
                toasterError(error || 'Failed to cancel request');
            }
        } catch (err) {
            console.error('Error cancelling request:', err);
            toasterError('An error occurred while cancelling the request');
        }
    };

    return (
        <>
            <ProfileDetailCard
                type={"user"}
                name="testing"
                role={"Group"}
                data={data}
                buttonText={data?.request_status === 'Pending' ? 'Request Sent' : 'Connect'}
                buttonIcon={<BiUserPlus size="20" className='fill-white' />}
                onButtonClick={data?.request_status === 'Pending' ? cancelRequest : connectUser}
                />
        </>
    )
}
