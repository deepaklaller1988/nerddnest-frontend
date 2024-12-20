"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { useApi } from '@/hooks/useAPI'
import { FaCamera } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { capitalizeName } from '@/utils/capitalizeName'
import { uploadProfileImage } from '../core/UploadFile'
import { setUserId } from "../../redux/slices/auth.slice";
import { MdMoreHoriz, MdOutlineExitToApp } from 'react-icons/md'
import { UserProfileActionsMenu } from '@/lib/MenuBar/UserProfileActionsMenu'

import FriendsContent from '../Profile/FriendsContent'
import NavigationUserMenu from "../../lib/MenuBar/NavigateUserMenu"


export default function ProfileDetailCard({ data, type, buttonText, buttonIcon, onButtonClick }: any) {
    const { API } = useApi()
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state.auth.id)
    const image = useSelector((state: any) => state.auth.image) 

    const [openActionsMenu, setOpenActionsMenu] = useState(false)
    const [loadingProfileImage, setLoadingProfileImage] = useState(false);

    const [profileImage, setUserImage] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState('Friends');
    const [activeMenuItem, setActiveMenuItem] = useState('Friends');

    useEffect(()=>{
        setUserImage(image)
    },[image])

    const toggleActionsMenu = () => {
        setOpenActionsMenu(prevState => !prevState);
    }
    const menuItems = [
        { id: 'Friends', label: 'Friends' },
        { id: 'photos', label: 'Photos' },
        { id: 'videos', label: 'Videos' },
        { id: 'album', label: 'Album' },
        { id: 'documents', label: 'Documents' },
        { id: 'sendInvites', label: 'Send Invites' },
        { id: 'discussions', label: 'Discussions' },
        { id: 'manage', label: 'Manage' },
    ];
    const handleTabClick = (tabId: any, itemId: any) => {
        setActiveTab(tabId);
        setActiveMenuItem(tabId);
    };
    const handleMouseLeave = () => setHoveredItem(null);
    const handleMouseEnter = (label: string) => setHoveredItem(label);

    const renderDynamicContent = () => {
        switch (activeMenuItem) {
            case 'Friends':
                return <><FriendsContent /></>;
            case 'photos':
                return <div>Photos Content</div>;
            case 'videos':
                return <div>Videos Content</div>;
            case 'album':
                return <div>Album Content</div>;
            case 'documents':
                return <div>Documents Content</div>;
            case 'sendInvites':
                return <div>Send Invites Content</div>;
            case 'discussions':
                return <div>Discussions Content</div>;
            case 'manage':
                return <div>Manage Content</div>;
            default:
                return null;
        }
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoadingProfileImage(true);

            const uploadedData = await uploadProfileImage(file, userId, API);
            setLoadingProfileImage(false);
            if (uploadedData) {
                setUserImage(uploadedData.image)
                dispatch(setUserId({
                    image: uploadedData.image,
                    id: data.id,
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName
                }));                

            }
        } catch (error) {
            setLoadingProfileImage(false);
            console.error("Image upload failed:", error);
        }
    };

    return (
        <div className='w-full pt-8'>
            <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
                <div className='w-full rounded-[12px]  bg-[var(--sections)] border border-white/5'>
                    <div className='w-full relative'>
                        <div className='w-full bg-[var(--highlght-hover)] rounded-[12px] overflow-fidden'>
                            <img src='cover-image.png' className='w-full' alt="Cover Image" />
                        </div>
                        {data.id == userId && (
                            <span className='absolute left-4 top-4 rounded-lg bg-white p-2'>
                                <input className='top-0 left-0 absolute w-full h-full opacity-0 cursor-pointer' type="file" />
                                <FaCamera />
                            </span>)
                        }

                    </div>
                    <div className='w-full'>
                        <section className='w-full flex gap-4 justify-between items-start p-4 px-8'>
                            <div className='flex gap-6'>
                                <section className='w-40 h-40 relative rounded-lg overflow-hidden -top-20 border border-white/40'>

                                    {loadingProfileImage ? (
                                        <div className="flex justify-center items-center w-full h-full">
                                            <Image src="/spinner.gif" alt="Loading..." className="w-12 h-12" height={50} width={50} />
                                        </div>
                                    ) : (<img
                                        src={profileImage || 'profile-avatar-legacy-50.png'}
                                        className='w-full h-full object-cover runded-lg block' alt="dp" />)}
                                    {data.id == userId && <span className='absolute left-4 top-4 rounded-lg bg-white p-2'>
                                        <input className='top-0 left-0 absolute w-full h-full opacity-0 cursor-pointer'
                                            type="file" accept='image/*'
                                            onChange={handleUploadImage} />
                                        <FaCamera />
                                    </span>}
                                </section>
                                <section>
                                    <h5 className='text-[25px] text-white font-semibold'>{capitalizeName(data.firstname)} {capitalizeName(data.lastname)}<b className='relative top-[-2px] font-normal text-[12px] p-1 px-2 rounded-full text-white bg-[var(--highlight)] ml-4'>Member</b></h5>
                                    <p>
                                        <span className=''>Public</span>
                                        <b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b>
                                        <span className='ml-2'>Member</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className=''>Active 16 hours ago</span></p>
                                    {/* <p className='text-white mt-2'>Printing and typesetting industry.</p>
                                    <div className='mt-2 flex gap-2 items-center'>
                                        <div className='w-8 h-8 rounded-full overflow-hidden border-2 border-white/10'>
                                            <img src='dp.jpg' alt="dp" />
                                        </div>
                                        <p>Lord Lexi (<b className='text-normal text-[12px] text-white'>Organizer</b>)</p>
                                    </div> */}

                                    <div className='mt-2 flex gap-2 items-center'>
                                        <p>0<b className='text-normal text-[12px] text-white ml-2'>Followers</b></p>

                                        <p>0<b className='text-normal text-[12px] text-white ml-2'>Following</b></p>
                                    </div>
                                </section>
                            </div>
                            {data.id !== userId &&

                                <div className='flex gap-2 mt-4'>
                                    <button
                                        onClick={onButtonClick}
                                        className={`${type === 'user' ? 'bg-[var(--highlight)]' : 'bg-red-500'} text-white font-bold p-2 rounded-lg flex gap-1 items-center justify-center`}
                                    >
                                        {buttonIcon ? buttonIcon : <MdOutlineExitToApp size="20" className="fill-white" />}
                                        <span
                                            className="text-white"
                                            onMouseEnter={(e) => {
                                                const target = e.target as HTMLElement;
                                                if (data?.request_status === 'Pending') target.textContent = 'Cancel Request';
                                            }}
                                            onMouseLeave={(e) => {
                                                const target = e.target as HTMLElement;
                                                if (data?.request_status === 'Pending') target.textContent = 'Request Sent';
                                            }}
                                        >
                                            {data?.request_status === 'Pending' ? 'Request Sent' : buttonText}
                                        </span>
                                    </button>

                                    <button className='p-2 px-3 rounded-lg bg-black/50'>
                                        {/* <HiBell className='hidden' /><HiBellSlash className='fill-white' /> */}
                                        <MdMoreHoriz className='fill-white' onClick={toggleActionsMenu} />
                                    </button>
                                </div>
                            }
                            {openActionsMenu && (
                                <div data-popup-type="postactions" className="!z-10 shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)]  min-w-[210px] py-2 rounded-lg bg-[var(--bgh)] absolute mt-5 right-0">

                                    {UserProfileActionsMenu({
                                        isFollow: true,
                                        toggleCommenting: () => console.log('Toggle commenting'),
                                        postId: "somePostId",
                                        openEditModal: (postId: any) => console.log('Open edit modal for', postId)
                                    }).map(({ icon, label, onClick }, index) => (

                                        <button
                                            key={index}
                                            className={`flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none ${hoveredItem === label ? "drop" : ""
                                                }`}
                                            aria-label={label}
                                            onMouseEnter={() => handleMouseEnter(label)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={onClick}
                                        >
                                            {icon} {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    <NavigationUserMenu
                        menuItems={menuItems}
                        activeTab={activeTab}
                        onTabClick={handleTabClick}
                        memberCount={2}
                    />
                </div>
            </div>

            {activeMenuItem && data.id == userId && (
                <>
                    {renderDynamicContent()}
                </>
            )}
        </div >

    )
}
