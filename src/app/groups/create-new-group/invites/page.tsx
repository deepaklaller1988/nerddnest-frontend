import React from 'react'
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
export default function Invites() {
  return (
    <div className='p-6'>
      <h2 className=" text-[var(--highlight)] mb-4 font-bold text-[20px]">Invite Connections</h2>
      <div className='w-full flex border'>
        <section className='w-1/2 border-r'>
          <div className='w-full flex items-center justify-between border-b'>
            <h3 className='font-semibold text-black p-4'>Members</h3>
            <section className='p-4'><label className="flex items-center customCheckbox">
              <input
                type="checkbox"
                name="agree"
              />
              <span></span>
              <b className="ml-2 font-semibold text-[var(--highlight)]">
                My Connections
              </b>
            </label></section>
          </div>
          <div className='w-full p-4'>
            <div className="relative flex items-center justify-between mb-4">
              <FiSearch className="text-[18px] absolute left-[15px] text-[var(--lightgrey)]" />
              <input
                className="bg-gray-500/10 rounded-full p-[10px] pl-12 w-full"
                type="text"
                placeholder="Search Groups..."
              />
              <MdClose
                className="absolute right-[15px] text-[var(--lightgrey)] cursor-pointer opacity-0"
              />
            </div>
            <div className='w-full max-h-screen overflow-auto'>
              <div className='w-full flex gap-2 justify-between items-center border-t py-3 group cursor-pointer'>
                <section className='flex gap-2 items-center'>
                  <span><img className='border w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                  <b className='group-hover:text-[var(--highlight)]'>Alvin Marcos</b>
                </section>
                <AiOutlinePlusCircle size="26" className='cursor-pointer group-hover:fill-[var(--highlight)]' />
                <AiOutlinePlusCircle size="26" className='hidden rotate-45 fill-red-500 cursor-pointer' />
              </div>
              <div className='w-full flex gap-2 justify-between items-center border-t py-3 group cursor-pointer'>
                <section className='flex gap-2 items-center'>
                  <span><img className='border w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                  <b className='group-hover:text-[var(--highlight)]'>Alvin Marcos</b>
                </section>
                <AiOutlinePlusCircle size="26" className='cursor-pointer group-hover:fill-[var(--highlight)]' />
                <AiOutlinePlusCircle size="26" className='hidden rotate-45 fill-red-500 cursor-pointer' />
              </div>
              <div className='w-full flex gap-2 justify-between items-center border-t py-3 group cursor-pointer'>
                <section className='flex gap-2 items-center'>
                  <span><img className='border w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                  <b className='group-hover:text-[var(--highlight)]'>Alvin Marcos</b>
                </section>
                <AiOutlinePlusCircle size="26" className='cursor-pointer group-hover:fill-[var(--highlight)]' />
                <AiOutlinePlusCircle size="26" className='hidden rotate-45 fill-red-500 cursor-pointer' />
              </div>
              <div className='w-full flex gap-2 justify-between items-center border-t py-3 group cursor-pointer'>
                <section className='flex gap-2 items-center'>
                  <span><img className='border w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                  <b className='group-hover:text-[var(--highlight)]'>Alvin Marcos</b>
                </section>
                <AiOutlinePlusCircle size="26" className='cursor-pointer group-hover:fill-[var(--highlight)]' />
                <AiOutlinePlusCircle size="26" className='hidden rotate-45 fill-red-500 cursor-pointer' />
              </div>
            </div>
          </div>
        </section>
        <section className='w-1/2 flex flex-col justify-between'>
          <h3 className='font-semibold text-black p-4 border-b'>Send Invites</h3>
          <div className='w-full p-4 flex gap-2 flex-wrap'>
<div className='flex items-center gap-2 bg-gray-500 rounded-full p-2'><b className='text-white'>Alvin</b><AiOutlinePlusCircle size="18" className='fill-white hover:fill-red-500 rotate-45 cursor-pointer' /></div>
<div className='flex items-center gap-2 bg-gray-500 rounded-full p-2'><b className='text-white'>Marcos</b><AiOutlinePlusCircle size="18" className='fill-white hover:fill-red-500 rotate-45 cursor-pointer' /></div>
<div className='flex items-center gap-2 bg-gray-500 rounded-full p-2'><b className='text-white'>Alvin Marc</b><AiOutlinePlusCircle size="18" className='fill-white hover:fill-red-500 rotate-45 cursor-pointer' /></div>
<div className='flex items-center gap-2 bg-gray-500 rounded-full p-2'><b className='text-white'>Alvinin</b><AiOutlinePlusCircle size="18" className='fill-white hover:fill-red-500 rotate-45 cursor-pointer' /></div>
<div className='flex items-center gap-2 bg-gray-500 rounded-full p-2'><b className='text-white'>Alvin</b><AiOutlinePlusCircle size="18" className='fill-white hover:fill-red-500 rotate-45 cursor-pointer' /></div>
          </div>
          <div className='w-full border-t h-full p-4 relative'>
            <textarea placeholder="Customize message..." className='w-full h-full resize-none pb-11'></textarea>
            <div className='w-full flex gap-2 absolute z-10 left-0 bottom-0 p-4 pt-0'>
              <button className='bg-[var(--highlight)] rounded-full p-2 px-4 text-white'>Send</button>
              <button className='bg-gray-500 rounded-full p-2 px-4 text-white'>Cancel</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
