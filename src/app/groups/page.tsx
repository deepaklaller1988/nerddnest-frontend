"use client"
import React from 'react'
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BiGridAlt } from "react-icons/bi";
import { BiListUl } from "react-icons/bi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineExitToApp } from "react-icons/md";
import Select from 'react-select'
import { useRouter } from 'next/navigation';

const options = [
  { value: 'Recently Active', label: 'Recently Active' },
  { value: 'Recently Active1', label: 'Recently Active1' },
  { value: 'Recently Active2', label: 'Recently Active2' }
]
export default function Page() {
  const route=useRouter()
  return (
    // <CreateGroupForm/>
    <div className='w-full pt-8'>
      <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
        <div className='w-full rounded-[12px] bg-white'>
          <section className='flex gap-4 justify-between'>
            <h2 className="text-[var(--highlight)] font-semibold p-4 py-6 uppercase">Groups</h2>
            <div className="relative flex items-center justify-between mr-4">
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
          </section>
          <div className='w-full p-4 border-t flex gap-4 justify-between'>
            <section className='w-full flex gap-8'>
              <button className='flex items-center gap-2 text-[var(--highlight)] font-semibold hover:text-[var(--highlight)]'>All Groups <b className='bg-[var(--highlight)] text-white rounded-full px-2 font-semibold'>5</b></button>
              <button className='flex items-center gap-2 hover:text-[var(--highlight)]'>My Groups <b className='bg-[var(--highlight)] text-white rounded-full px-2 font-semibold'>5</b></button>
              <button className='hover:text-[var(--highlight)]' onClick={()=>route.push("/groups/create-new-group")}>Create Group</button>
            </section>
            <section className='flex gap-2'>
              <Select className='w-[180px]' options={options} />
              <div className='flex gap-2'>
                <button className='bg-[var(--highlight)] hover:bg-[var(--highlight)] group w-10 flex items-center justify-center rounded-lg'><BiGridAlt className='group-hover:fill-white fill-white' /></button>
                <button className='bg-gray-500/10 hover:bg-[var(--highlight)] group w-10 flex items-center justify-center rounded-lg'><BiListUl className='group-hover:fill-white' /></button>
              </div>
            </section>
          </div>
          <div className='w-full border-t-2 bg-black/10 rounded-[12px]'>
            <section className='flex p-2 flex-wrap'>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
              <div className='p-2 w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4'>
              {/* add listSet class on above div if user click on list icon */}
                <div className='w-full rounded-lg overflow-hidden bg-white showLeaveGroupMain'>
                  <span className='w-full relative'>
                    <img className='w-full min-h-[100px] object-cover' src='banner1.jpg' alt="banner" />
                    <div className='w-20 h-20 rounded-full overflow-hidden absolute -bottom-10 left-4 border-2 border-white'>
                      <img src='dp.jpg' alt="dp" />
                    </div>
                  </span>
                  <section className='mt-10 pt-2 px-4 pb-4'>
                    <h3 className='font-bold text-xl text-black'>Amazon Shoping Group</h3>
                    <p><span className='text-[12px]'>Public</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Group</span><b className='font-bold text-[20px] px-1 relative -top-[2] text-gray-500/50'>.</b><span className='text-[12px]'>Active 16 hours ago</span></p>
                  </section>
                  <section className='flex gap-4 justify-between px-4 border-t py-4 relative'>
                    <div className='flex gap-2 items-center'>
                      <span><img className='border-1 border-white w-9 h-9 rounded-full object-cover' src='dp.jpg' alt="dp" /></span>
                      <span>
                        <b className='block'>Lord Lexy</b>
                        <p className='flex gap-1 items-center text-sm'>Organizer<IoIosCheckmarkCircle className='fill-[var(--highlight)]' size="14" /></p>
                      </span>
                    </div>
                    <button className='showLeaveGroup bg-red-500 text-white font-bold p-4 flex gap-1 items-center justify-center absolute w-full h-full top-0 right-0'><MdOutlineExitToApp size="20" className='fill-white' /> Leave Group</button>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
