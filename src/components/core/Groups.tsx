import React from 'react'
import { FiArrowRight } from "react-icons/fi";

export default function Groups() {
    return (
        <div className='min-w-[280px] max-w-[280px] rounded-lg bg-white p-4'>
            <h2 className='text-[var(--highlight)] font-semibold pb-4'>GROUPS</h2>
            <div className='w-full'>
                <section className='border-b border-gray-500/50 flex gap-4 mb-4'>
                    <button className='activeFriends py-2 relative bottom-[-1px]'>Newest</button>
                    <button className=' py-2 relative bottom-[-1px]'>Active</button>
                    <button className=' py-2 relative bottom-[-1px]'>Popular</button>
                </section>
                {/* <p className='py-3'>There are no users currently online</p> */}
                <div className='w-full flex flex-col gap-3'>
                    <section className='cursor-pointer flex items-center gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span>
                            <h6 className='text-[var(--highlight)]'>Preety Marcos</h6>
                        <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <section className='cursor-pointer flex items-center gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span>
                            <h6 className='text-[var(--highlight)]'>Preety Marcos</h6>
                        <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <section className='cursor-pointer flex items-center gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span>
                            <h6 className='text-[var(--highlight)]'>Preety Marcos</h6>
                        <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <button className='sticky bottom-0 bg-white font-semibold w-full p-4 pb-0 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight] buttonSet'>View All <FiArrowRight /></button>
                </div>
            </div>
        </div>
    )
}
