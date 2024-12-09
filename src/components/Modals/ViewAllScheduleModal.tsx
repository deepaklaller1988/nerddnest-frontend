import React from "react";
import { GoGlobe } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
type ViewAllScheduleModalProps = {
    isViewPopupOpen: any
    onClose: () => void;
};

const ViewAllScheduleModal = ({ onClose }: ViewAllScheduleModalProps) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center ">
            <div className="max-h-[80vh] overflow-auto bg-[var(--sections)] border border-white/10 w-full max-w-[600px] rounded-[12px] shadow-lg">
                <div className="flex items-center justify-between  p-4 border-b border-white/5">
                    <h2 className=" uppercase font-semibold text-center block text-white">Scheduled Posts</h2>
                    <button onClick={onClose} className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white">&times;</button>
                </div>
                <div className="p-4 flex flex-col gap-3">
                    <div className='w-full flex flex-col gap-3 rounded-lg bg-white/10 p-4'>
                        <section className='cursor-pointer flex items-center gap-2 pr-14 relative'>
                            <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                                <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                            </span>
                            <span className='w-full'>
                                <p className='text-[12px]'>
                                    <b className='text-white font-semibold'>Preety Marcos</b> Posted an update</p>
                                <p className='text-[12px] text-white'><b className="font-semibold text-white">Schedule for:</b> December 9, 2024 at 12:00 pm <GoGlobe className="fill-white inline-block" /></p>
                            </span>
                            <span className="flex absolute top-2 right-0 gap-3">
                                <button><MdEdit size="16" className="hover:fill-white duration-[.5s]" /></button>
                                <button><MdDeleteForever size="16" className="hover:fill-white duration-[.5s]" /></button>
                            </span>
                        </section>
                        <p>Uptodown is a multi-platform app store specialized in Android. Our goal is to provide free and open access to a large catalog of apps without restrictions</p>
                        <p>while providing a legal distribution platform accessible from any browser, and also through its official native app.</p>
                    </div>
                    <div className='w-full flex flex-col gap-3 rounded-lg bg-white/10 p-4'>
                        <section className='cursor-pointer flex items-center gap-2 pr-14 relative'>
                            <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                                <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                            </span>
                            <span className='w-full'>
                                <p className='text-[12px]'>
                                    <b className='text-white font-semibold'>Preety Marcos</b> Posted an update</p>
                                <p className='text-[12px] text-white'><b className="font-semibold text-white">Schedule for:</b> December 9, 2024 at 12:00 pm <GoGlobe className="fill-white inline-block" /></p>
                            </span>
                            <span className="flex absolute top-2 right-0 gap-3">
                                <button><MdEdit size="16" className="hover:fill-white duration-[.5s]" /></button>
                                <button><MdDeleteForever size="16" className="hover:fill-white duration-[.5s]" /></button>
                            </span>
                        </section>
                        <p>Uptodown is a multi-platform app store specialized in Android. Our goal is to provide free and open access.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllScheduleModal;
