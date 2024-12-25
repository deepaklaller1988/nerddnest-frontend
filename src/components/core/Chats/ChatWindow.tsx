
import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import { BsThreeDots } from 'react-icons/bs'
import { MessageActionsMenu } from '@/lib/MenuBar/MessageActionMenu';
import { capitalizeName } from '@/utils/capitalizeName';
import { useApi } from '@/hooks/useAPI';
import { useSelector } from 'react-redux';

export default function ChatWindow({ activeChatId, data, isHandleClickActive, setIsHandleClickActive }: any) {
    const { API } = useApi()
    const [options, setOptions] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const userId = useSelector((state: any) => state.auth.id);

    const [results, setResults] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const handleToggleReadUnread = (data: any) => {
    }
    const openBlockModal = (data: any) => {
    }
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

    const getSearchData = async () => {
        const { success, error, data } = await API.get(`friends/search?userId=${userId}6&search=${searchTerm}`);
        if (success) {
            setResults(data)
        }
        else {
            console.log(error);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setResults([]);
    };

    const messages: any = [
        {
            id: 1,
            type: "receiver",
            text: "Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side? Hi, i am marcos from Amazon, I want to know that which parcel is pending from your side?",
            timestamp: "4:37 AM",
            sender: {
                name: "Marcos",
                image: "dp.jpg",
            },
        },
        {
            id: 2,
            type: "sender",
            text: "Hi, I m indu this Side",
            timestamp: "4:39 AM",
        },
        {
            id: 3,
            type: "receiver",
            text: "Can you resend the details? I couldn't find them in my inbox.",
            timestamp: "4:41 AM",
            sender: {
                name: "Marcos",
                image: "dp.jpg",
            },
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || "";
        setSearchTerm(value);
    }

    const onClose = () => {
        setIsHandleClickActive(false)
    }

    return (
        <div className="flex-1 flex flex-col bg-[var(--sections)]">
            <div className="flex items-center justify-between gap-6 border-b border-white/5 p-4">
                {isHandleClickActive ?
                    <>
                        <div className="flex gap-3 h-14">
                            <h2 className='mt-4 text-white'>To:</h2>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="w-full bg-white/0 py-2 placeholder:font-semibold placeholder:text-[var(--foreground)] pr-5"
                            placeholder="Start Typing to find.."
                        />
                        <button type="button" onClick={onClose} className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white">&times;</button>

                    </>
                    :
                    <>
                        <div className="flex gap-3">
                            <div className="w-14 rounded-full overflow-hidden border-2 border-white">
                                <img
                                    src="dp.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h3 className="capitalize text-lg font-semibold text-white">
                                    {capitalizeName(data?.firstname)}
                                    {capitalizeName(data?.lastname)}
                                </h3>
                                <p className="">Started Friday</p>
                            </div>
                        </div>
                        <div></div>
                        <BsThreeDots onClick={handleButtonPopup} size={26} className="cursor-pointer relative" />

                        {options && (
                            <div
                                className="absolute  right-5 !z-10 bg-[var(--bgh)] shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)]"
                            >
                                <div className="!z-10 shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-[var(--bgh)] absolute mt-0 right-0">                          {MessageActionsMenu({
                                    postId: data?.id,
                                    isMarkedRead: data?.isMarkedRead,
                                    isArchieve: data?.isArchieve,
                                    toggleReadUnread: () => handleToggleReadUnread(data),
                                    toggleArchieveUnArc: () => handleToggleArchieveUnArc(data),
                                    openBlockModal: () => openBlockModal(data.id),
                                    openReportModal: () => openReportModal(data.id),

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
                            </div>
                        )}
                    </>
                }
            </div>
            {searchTerm && (
                <div className="w-full overflow-y-auto overflow-x-hidden rounded-lg bg-white absolute mt-1 max-h-[500px]">
                    {results.length > 0 ? (
                        results.map((result: any, index: any) => (
                            <section
                                key={index}
                                className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-black/10 hover:bg-gray-400/10 duration-[.5s]"
                            >
                                <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                                    <img src={result.image || "/profile-avatar-legacy-50.png"} alt="Image" />
                                </span>
                                <div className="w-full"
                                // onClick={() => handleClick(result.id)}
                                >
                                    <b className="text-[var(--highlight)]" >{capitalizeName(result.firstname)}  {capitalizeName(result.lastname)}</b>
                                    <p>{result.description}</p>
                                    {/* <div className="flex flex-wrap gap-x-2 text-[13px] text-black/30">
                    <span>By {result.author}</span>
                    <span className="middot">·</span>
                    <span>{result.date}</span>
                  </div> */}
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">No results found.</div>
                    )}

                    {/* {results.length > 1 && <ViewButton
            onClick={handleViewAll}
            name="View All"
            className="sticky bottom-0 bg-white font-semibold w-full p-4 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight]"
          /> } */}
                </div>
            )}
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white/10 border-b border-white/5">
                <div className="text-center text-gray-500 text-sm relative border-t border-white/5 mt-5 pb-5">
                    <b className="absolute bg-[var(--highlght-hover)] rounded-full top-[-10px] px-3 text-sm text-white">Friday</b>
                </div>
                {messages &&
                    messages.length > 0 &&
                    messages.map((item: any, index: any) => (
                        <div
                            key={index}
                            className={`w-full ${item.type === "sender" ? "sender flex justify-end" : "receiver"}`}
                        >
                            <div
                                className={`inline-flex items-start space-x-3 rounded-xl p-4 max-w-[80%] ${item.type === "sender" ? "bg-black/20" : "bg-[var(--sections)]"
                                    }`}
                            >
                                {item.type === "receiver" && (
                                    <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-white rounded-full overflow-hidden border border-white">
                                        <img src={item.sender.image} alt="dp" />
                                    </div>
                                )}
                                <div>
                                    <p className={item.type === "receiver" ? "text-white" : ""}>{item.text}</p>
                                    <p className="text-xs text-gray-400 text-right relative top-2">{item.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <ChatInput />
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