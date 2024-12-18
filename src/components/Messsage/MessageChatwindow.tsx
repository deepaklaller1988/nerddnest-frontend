import React, { useState } from 'react'
import { BiBarChartSquare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineGif, HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { PiDownloadSimpleThin } from "react-icons/pi";
import { MdBlockFlipped } from "react-icons/md";
import { FiFlag } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const MessageChatwindow = () => {
    const [options, setOptions] = useState<boolean>(false)
    const [visible, setVisible] = useState(false);

    const handleButtonPopup = () => {
        setOptions(!options)
    }
    const togglePasswordVisibility = () => {
        setVisible((prevState) => !prevState);
    };

    return (
        <>
            <div className="flex-1 flex flex-col bg-[var(--sections)]">
                <div className="flex items-center justify-between gap-6 border-b border-white/5 p-4">
                    <div className="flex gap-3">
                        <div className="w-14 rounded-full overflow-hidden border-2 border-white">
                            <img src="dp.jpg" alt=""/>
                        </div>
                        <div>
                            <h3 className="capitalize text-lg font-semibold text-white">Avion Astro</h3>
                            <p className="">Started Friday</p>
                        </div>
                    </div>
                    <BsThreeDots onClick={handleButtonPopup} size={26} className="cursor-pointer relative" />
                </div>
                {/* options */}
                {options && (<div className=' w-[250px] h-[200px] absolute mt-16 right-5 !z-10 bg-[var(--bgh)] shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)]'>
                    <div className='flex flex-col px-2 py-2'>
                        <button className='flex justify-start gap-3 items-center mt-2 text-white' onClick={togglePasswordVisibility}><span className='cursor-pointer' >{visible ? <FaRegEye /> : <FaRegEyeSlash />}</span>Mark as unread</button>
                        <button className='flex justify-start gap-3 items-center mt-2 text-white'><span><PiDownloadSimpleThin /></span>Archive</button>
                        <button className='flex justify-start gap-3 items-center mt-2 text-white'><span><MdBlockFlipped /></span>Block member</button>
                        <button className='flex justify-start gap-3 items-center mt-2 text-white'><span><FiFlag /></span>Report member</button>
                        <button className='flex justify-start gap-3 items-center mt-2 text-white'><span><RiDeleteBinLine /></span>Delete your messages</button>
                        <button className='flex justify-start gap-3 items-center mt-2 text-white'><span><RiDeleteBinLine /></span>Delete conversation</button>
                    </div>
                </div>)}

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


                <div className="mt-3">
                    <div className="w-full">
                        <section className="flex gap-4 cursor-pointer p-4">
                            <div
                                // onClick={handleClick}
                                className="w-full bg-gray-200 p-2 px-5 rounded-full flex items-center text-gray-500/70"
                            >
                                Write a message....
                            </div>
                        </section>
                        <div className="border-t border-gray-500/10 flex justify-between items-center">
                            <section className="p-4 flex gap-4">
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
                            <div >
                                <section className="p-4 flex gap-4">
                                    <CiFaceSmile className="w-6 h-6 fill-green-800 mt-1" />
                                    <div className="p-1 bg-blue-800 rounded-full">

                                        <IoIosSend className="w-6 h-6 fill-white" />

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageChatwindow