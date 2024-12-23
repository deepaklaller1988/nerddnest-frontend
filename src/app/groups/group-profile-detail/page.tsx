import React from 'react'
import { FaCamera } from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { HiBell } from "react-icons/hi2";
import { HiBellSlash } from "react-icons/hi2";

export default function page() {
  return (
    <div className='w-full pt-8'>
      <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
        <div className='w-full rounded-[12px]  bg-[var(--sections)] border border-white/5'>
          <div className='w-full relative'>
            <div className='w-full bg-[var(--highlght-hover)] rounded-[12px] overflow-fidden'>
              <img src='cover-image.png' className='w-full' alt="Cover Image" />
            </div>
            <span className='absolute left-4 top-4 rounded-lg bg-white p-2'>
              <input className='top-0 left-0 absolute w-full h-full opacity-0 cursor-pointer' type="file" />
              <FaCamera />
            </span>
          </div>
          <div className='w-full'>
            <section className='w-full flex gap-4 justify-between items-start p-4 px-8'>
              <div className='flex gap-6'>
                <section className='w-40 h-40 relative rounded-lg overflow-hidden -top-20 border border-white/40'>
                  <img src='dp.jpg' className='w-full h-full object-cover runded-lg block' alt="dp" />
                  <span className='absolute left-4 top-4 rounded-lg bg-white p-2'>
                    <input className='top-0 left-0 absolute w-full h-full opacity-0 cursor-pointer' type="file" />
                    <FaCamera />
                  </span>
                </section>
                <section>
                  <h5 className='text-[25px] text-white font-semibold'>Amazon Shoping Group <b className='relative top-[-2px] font-normal text-[12px] p-1 px-2 rounded-full text-white bg-[var(--highlight)]'>Group</b></h5>
                  <p><span className=''>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className=''>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className=''>Active 16 hours ago</span></p>
                  <p className='text-white mt-2'>Printing and typesetting industry.</p>
                  <div className='mt-2 flex gap-2 items-center'>
                    <div className='w-8 h-8 rounded-full overflow-hidden border-2 border-white/10'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                    <p>Lord Lexi (<b className='text-normal text-[12px] text-white'>Organizer</b>)</p>
                  </div>
                </section>
              </div>
              <div className='flex gap-2 mt-4'>
                <button className='bg-red-500 text-white font-bold p-2 rounded-lg flex gap-1 items-center justify-center'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
              <button className='p-2 px-3 rounded-lg bg-black/50'><HiBell className='hidden' /><HiBellSlash className='fill-white'/></button>
              </div>
            </section>
            <div className='w-full border-t border-white/5 p-8 py-0 flex gap-6 items-center'>
            <div className='mr-4'><button className='flex gap-2 items-center font-semibold text-white'>Members <b className='text-[12px] px-2 rounded-full text-white bg-black/50 min-w-[30px]'>2</b></button></div>
            <button className='text-white font-semibold border-b border-white py-4'>Feed</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Photos</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Videos</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Album</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Documents</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Send Invites</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Discussions</button>
            <button className='border-b border-white/0 hover:border-white py-4 hover:text-white'>Manage</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
