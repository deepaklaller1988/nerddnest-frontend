"use client"
import { useApi } from '@/hooks/useAPI';
import { useSelector } from 'react-redux';
import { BiUserPlus } from 'react-icons/bi'
import Loader from '@/components/Loaders/Loader';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import ProfileDetailCard from '@/components/Cards/ProfileDetailCard'
import { toasterError, toasterSuccess } from '@/components/core/Toaster';

const UserProfile = () => {
    const { API } = useApi()
    const searchParams = useSearchParams();
    const friendId = searchParams.get("id");
    const userId = useSelector((state: any) => state.auth.id);

    const [data, setData] = useState<any>([])

    useEffect(() => {
        if (friendId && userId) {
            getPostData()
        }
    }, [friendId, userId])

    const getPostData = async () => {
        const { success, error, data } = await API.get(`friends/friend-profile?userId=${userId}&friendId=${friendId}`);
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
                userId, friendId
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
                friendId
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

    const unFriend = async () => {

    }

    return (
        <>
            <ProfileDetailCard
                type={"user"}
                name="testing"
                role={"Group"}
                data={data}
                buttonText={data?.request_status === 'Pending' ? 'Request Sent' : data?.request_status === "Accepted" ? "UnFollow" : 'Connect'}
                buttonIcon={<BiUserPlus size="20" className='fill-white' />}
                onButtonClick={data?.request_status === 'Pending' ? cancelRequest : data?.request_status === 'Accepted' ? unFriend : connectUser}
            />
        </>
    )
}

const ProfileWithSuspense = () => {
    return (
        <Suspense fallback={<div><Loader /></div>}>
            <UserProfile />
        </Suspense>
    );
};

export default ProfileWithSuspense;