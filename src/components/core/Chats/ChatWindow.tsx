
import React, { useState } from 'react'
import ChatInput from './ChatInput'
import { BsThreeDots } from 'react-icons/bs'
import { MessageActionsMenu } from '@/lib/MenuBar/MessageActionMenu';

export default function ChatWindow({ data }: any) {
    const [openMsgMenuIndex, setOpenMsgMenuIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<boolean>(false);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


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
    return (
        <div className="flex-1 flex flex-col bg-[var(--sections)]">
            <div className="flex items-center justify-between gap-6 border-b border-white/5 p-4">
                <div className="flex gap-3">
                    <div className="w-14 rounded-full overflow-hidden border-2 border-white">
                        <img
                            src="dp.jpg"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3 className="capitalize text-lg font-semibold text-white">
                            Avion Astro
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
                            openBlockModal:()=>openBlockModal(data.id),
                            openReportModal:()=>openReportModal(data.id),

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

            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-white/10 border-b border-white/5">
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
            </div>


            <ChatInput />
        </div>
    )
}
