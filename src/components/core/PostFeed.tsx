import React from 'react'
import { MdOutlineLinkedCamera } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { HiOutlineGif } from "react-icons/hi2";
import { BiBarChartSquare } from "react-icons/bi";

export default function PostFeed() {
  return (
    <div className='bg-white rounded-[12px] mt-3'>
        <div className='w-full'>
            <section className='flex gap-4 cursor-pointer p-4'>
                <span className='min-w-12 min-h-12 max-w-12 max-h-12 rounded-full overflow-hidden block'>
                <img className='w-full block h-full' src="/dp.jpg" alt="user"/>
                </span>
            <div className='w-full bg-gray-200 p-2 px-5 rounded-full flex items-center text-gray-500/70'>Share what's on your mind, Alvin Marcos...</div>
            </section>
            <section className='border-t border-gray-500/10 p-4 flex gap-4'>
                <span className='cursor-pointer'><MdOutlineLinkedCamera className='w-6 h-6 fill-green-600'/></span>
                <span className='cursor-pointer'><HiOutlineVideoCamera className='w-6 h-6 stroke-yellow-500'/></span>
                <span className='cursor-pointer'><IoDocumentAttachOutline className='w-6 h-6 stroke-rose-500'/></span>
                <span className='cursor-pointer'><HiOutlineGif className='w-6 h-6 stroke-purple-700'/></span>
                <span className='cursor-pointer'><BiBarChartSquare className='w-6 h-6 fill-black'/></span>
            </section>
        </div>
    </div>
  )
}
