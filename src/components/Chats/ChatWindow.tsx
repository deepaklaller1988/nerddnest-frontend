
import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import { useApi } from '@/hooks/useAPI';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs'
import { capitalizeName } from '@/utils/capitalizeName';
import { MessageActionsMenu } from '@/lib/MenuBar/MessageActionMenu';
import useSocket from '@/hooks/useSocket';
import Image from 'next/image';
import { formatDate, formatTime } from '@/utils/timeAgo';

export default function ChatWindow({ getAllMessages, setActiveChatId, activeChatId, isHandleClickActive, setIsHandleClickActive, selectedChatData }: any) {
    const { API } = useApi()
    const socket = useSocket({})
    const userId = useSelector((state: any) => state.auth.id);

    const [options, setOptions] = useState<boolean>(false);
    const [messages, setMessages] = useState<any>([])
    const [results, setResults] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [message, setMessage] = useState<string>("");

    const handleToggleReadUnread = (data: any) => { }
    const openBlockModal = (data: any) => { }
    const openReportModal = (data: any) => { }
    const handleToggleArchieveUnArc = (data: any) => { }
    const handleMouseLeave = () => setHoveredIndex(null);
    const handleMouseEnter = (index: number) => setHoveredIndex(index);

    const handleButtonPopup = () => {
        setOptions(!options);
    };

    useEffect(() => {
        if (searchTerm && userId) {
            getSearchData()
        }
        else {
            setResults([]);
        }
    }, [searchTerm, userId])

    useEffect(() => {
        if (activeChatId) {
            getMessages(activeChatId)
        }
    }, [activeChatId])

    useEffect(() => {
        if (socket) {
            socket?.on("msg-receive", (newMessage: any) => {
                console.log(newMessage, '==sdsd')
                setActiveChatId(newMessage?.conversation_id)
            });

            return () => {
                socket.off("msg-receive");
            };
        }
    }, [socket, activeChatId]);

    const getSearchData = async () => {
        const { success, error, data } = await API.get(`friends/search?userId=${userId}6&search=${searchTerm}`);
        if (success) {
            setResults(data.filter((item: any) => item.id !== userId))
        }
        else {
            console.log(error);
        }
    };

    const getMessages = async (activeChatId: any) => {
        if (activeChatId) {
            const { success, error, data } = await API.get(`messages/get-messages?conversationId=${activeChatId ? activeChatId : ""}`);
            if (success) {
                setMessages(data)
            }
            else {
                console.log(error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || "";
        setSearchTerm(value);
    }

    const onClose = () => {
        setIsHandleClickActive(false)
        setSearchTerm('');
    }
    const handleSelectItem = (item: any) => {
        if (!selectedItems.some(selected => selected.id === item.id)) {
            setSelectedItems([...selectedItems, item]);
            setSearchTerm('');
        }
    };

    const handleRemoveItem = (id: any) => {
        setSelectedItems(selectedItems.filter(item => item.id !== id));
    };
console.log(messages)
    const handleChat = ({ payload, msgType }: any) => {
        socket?.emit(msgType, payload, (response: any) => {
            if (response.success) {
                if (msgType == "startConversation") {
                    console.log(response?.data?.conversation_id, "====conver")
                    setActiveChatId(response?.data?.conversation_id)
                }
                // getMessages(response?.data?.conversation_id)
                setMessages((prev: any) => [...prev, response.data]);
                getAllMessages()
                setMessage("");
                setSelectedItems([])
                onClose()

            }
        });
    }

    return (
        <div className="flex-1 flex flex-col bg-[var(--sections)]">
            <div className="flex items-center justify-between gap-6 border-b border-white/5 p-4">
                {isHandleClickActive ?
                    <>
                        <div className="flex gap-3 h-14">
                            <h2 className='mt-4 text-white'>To:</h2>
                        </div>
                        {selectedItems.map(item => (
                            <div
                                key={item.id}
                                className="flex items-center gap-2 bg-gray-500 text-white px-2 py-1 rounded-md"
                            >
                                <span className='text-white'>{item.firstname}</span>
                                <button
                                    className="text-xs font-bold"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="flex-1 bg-transparent py-1 text-white outline-none"
                            placeholder="Start Typing to find..."
                        />
                        <button type="button" onClick={onClose} className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white">&times;</button>
                        {searchTerm && results.length > 0 && (
                            <div className="absolute z-10 mt-36 max-h-60 w-96 overflow-auto rounded-md bg-white shadow-lg">
                                {results.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="cursor-pointer p-2 hover:bg-gray-200"
                                        onClick={() => handleSelectItem(item)}
                                    >
                                        {item.firstname} {item.lastname}
                                    </div>
                                ))}
                            </div>
                        )}
                        {searchTerm && results.length === 0 && (
                            <div className="absolute z-10 mt-36 w-96 p-2 rounded-md bg-white shadow-lg text-center text-gray-500">
                                No results found.
                            </div>
                        )}
                    </>
                    :
                    <>
                        <div className="flex gap-3">
                            {activeChatId ?
                                <div className="w-14 rounded-full overflow-hidden border-2 border-white">
                                    <Image
                                        src={selectedChatData?.image || "/profile-avatar-legacy-50.png"}
                                        alt="Image"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                : <h2 className="flex flex-row gap-4 text-xl font-semibold text-white p-4 pb-4">{"New Conversation Start"}</h2>
                            }
                            <div>
                                <h3 className="capitalize text-lg font-semibold text-white">
                                    {capitalizeName(selectedChatData?.conversation_name)}
                                </h3>
                                {/* <p className="">Started Friday</p> */}
                            </div>
                        </div>
                        <div></div>

                        <BsThreeDots onClick={handleButtonPopup} size={26} className="cursor-pointer relative" />

                    </>


                }
            </div>


            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white/10 border-b border-white/5">
                {!isHandleClickActive &&
                    <>
                        {messages &&
                            messages.length > 0 &&
                            (() => {
                                let lastDate: string | null = null;
                                return messages.map((item: any, index: any) => {
                                    const currentDate = formatDate(item.createdAt);
                                    const showDate = currentDate !== lastDate;
                                    if (showDate) {
                                        lastDate = currentDate;
                                    }

                                    return (
                                        <div key={index}>
                                            {showDate && (
                                                <div className="text-center text-gray-500 text-sm relative border-t border-white/5 mt-5 pb-5">
                                                    <b className="absolute bg-[var(--highlght-hover)] rounded-full top-[-10px] px-3 text-sm text-white">
                                                        {currentDate}
                                                    </b>
                                                </div>
                                            )}

                                            <div
                                                className={`w-full ${item.sender_id == userId ? "sender flex justify-end" : "receiver"
                                                    }`}
                                            >
                                                <div
                                                    className={`inline-flex items-start space-x-3 rounded-xl p-4 max-w-[80%] ${item.user_id == userId ? "bg-black/20" : "bg-[var(--sections)]"
                                                        }`}
                                                >
                                                    {item.sender_id !== userId &&
                                                        <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
                                                            <img src={selectedChatData?.image || "/profile-avatar-legacy-50.png"} alt="dp" />
                                                        </div>
                                                    }

                                                    <div>
                                                        <p className={item.sender_id !== userId ? "text-white" : ""}>
                                                            {item.content}
                                                        </p>
                                                        <div className="relative mt-4 grid grid-cols-4 gap-4 uploaded-data">
                                                            {item?.media_url?.map((file: any, index: any) => (
                                                                <div key={index} className="relative uploaded-dataInner">
                                                                    {item?.media_type == "image" ? (
                                                                        <Image
                                                                            src={file instanceof File ? URL.createObjectURL(file) : file}
                                                                            alt="uploaded"
                                                                            height={70}
                                                                            width={100}
                                                                            className="object-cover rounded-lg w-40 h-30"
                                                                        />
                                                                    ) : null}

                                                                    {item?.media_type == "video" ? (
                                                                        <video
                                                                            controls
                                                                            className="object-cover rounded-lg w-40 h-30"
                                                                        >
                                                                            <source src={file instanceof File ? URL.createObjectURL(file) : file} type="video/mp4" />
                                                                            Your browser does not support the video tag.
                                                                        </video>
                                                                    ) : null}

                                                                    {item?.media_type == "document" ? (
                                                                        <div className="flex items-center justify-center w-full h-30">
                                                                            {/* {renderFilePreview(file)} */}
                                                                            <span className="ml-2 text-sm text-gray-600">{file?.name}</span>
                                                                        </div>
                                                                    ) : null}

                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-xs text-gray-400 text-right relative top-2">
                                                            {formatTime(item?.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                    </>

                }
            </div>
            <ChatInput message={message} setMessage={setMessage} handleChat={handleChat} participatedId={selectedItems.map((item: any) => item.id)} onClose={onClose} setSelectedItems={setSelectedItems} activeChatId={activeChatId} />
        </div>
    )
}












// message Content
{/* <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white/10 border-b border-white/5">
<div className="text-center text-gray-500 text-sm relative border-t border-white/5 mt-5 pb-5"><b className="absolute bg-[var(--highlght-hover)] rounded-full top-[-10px] px-3 text-sm text-white">Friday</b></div>
<div className="w-full receiver">
    <div className="inline-flex items-start space-x-3 bg-[var(--sections)] rounded-xl p-4 max-w-[80%]">
        <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
            <img src="dp.jpg" alt="dp" />
        </div>
        <div>
            <p className="text-white">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="w-full sender flex justify-end">
    <div className="inline-flex items-start space-x-3 bg-black/20 rounded-xl p-4 max-w-[80%]">
        <div>
            <p className="">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="w-full receiver">
    <div className="inline-flex items-start space-x-3 bg-[var(--sections)] rounded-xl p-4 max-w-[80%]">
        <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
            <img src="dp.jpg" alt="dp" />
        </div>
        <div>
            <p className="text-white">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="w-full sender flex justify-end">
    <div className="inline-flex items-start space-x-3 bg-black/20 rounded-xl p-4 max-w-[80%]">
        <div>
            <p className="">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="w-full receiver">
    <div className="inline-flex items-start space-x-3 bg-[var(--sections)] rounded-xl p-4 max-w-[80%]">
        <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
            <img src="dp.jpg" alt="dp" />
        </div>
        <div>
            <p className="text-white">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="w-full sender flex justify-end">
    <div className="inline-flex items-start space-x-3 bg-black/20 rounded-xl p-4 max-w-[80%]">
        <div>
            <p className="">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="text-center text-gray-500 text-sm relative border-t border-white/5 mt-5 pb-5"><b className="absolute bg-[var(--highlght-hover)] rounded-full top-[-10px] px-3 text-sm text-white">Friday</b></div>
<div className="w-full receiver">
    <div className="inline-flex items-start space-x-3 bg-[var(--sections)] rounded-xl p-4 max-w-[80%]">
        <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
            <img src="dp.jpg" alt="dp" />
        </div>
        <div>
            <p className="text-white">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
<div className="w-full sender flex justify-end">
    <div className="inline-flex items-start space-x-3 bg-black/20 rounded-xl p-4 max-w-[80%]">
        <div>
            <p className="">Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? </p>
            <p className="text-xs text-gray-400 text-right relative top-2">4:37 AM</p>
        </div>
    </div>
</div>
</div> */}