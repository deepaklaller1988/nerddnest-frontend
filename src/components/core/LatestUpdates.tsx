import React from 'react'

export default function LatestUpdates() {
    return (
        <div className='min-w-[280px] max-w-[280px] rounded-lg bg-white p-4'>
            <h2 className='text-[var(--highlight)] font-semibold pb-4'>LATEST UPDATES</h2>
            <div className='w-full'>

                <div className='w-full flex flex-col gap-3 pt-3'>
                    <section className='cursor-pointer flex items-start gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span className='w-full'>
                            <p><b className='text-[var(--highlight)] font-semibold'>Preety Marcos</b> Posted an update</p>
                            <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <section className='cursor-pointer flex items-start gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span className='w-full'>
                            <p><b className='text-[var(--highlight)] font-semibold'>Preety Marcos</b> Posted an update</p>
                            <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <section className='cursor-pointer flex items-start gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span className='w-full'>
                            <p><b className='text-[var(--highlight)] font-semibold'>Preety Marcos</b> Posted an update</p>
                            <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <section className='cursor-pointer flex items-start gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span className='w-full'>
                            <p><b className='text-[var(--highlight)] font-semibold'>Preety Marcos</b> Posted an update</p>
                            <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                    <section className='cursor-pointer flex items-start gap-2'>
                        <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
                            <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
                        </span>
                        <span className='w-full'>
                            <p><b className='text-[var(--highlight)] font-semibold'>Preety Marcos</b> Posted an update</p>
                            <p className='text-[13px] text-gray-500/50'>active 3 days ago</p>
                        </span>
                    </section>
                </div>
            </div>
        </div>
    )
}
