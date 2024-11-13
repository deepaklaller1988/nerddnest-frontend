import React from 'react'
import Link from 'next/link'
export default function Live() {
    return (
        <div className='min-w-[280px] max-w-[280px] rounded-lg bg-white p-4'>
            <h2 className='text-[var(--highlight)] font-semibold pb-6'>LATEST UPDATES</h2>
            <div className='w-full flex flex-col gap-3'>
                <Link className='flex gap-2 items-center' href=""><span><img className='w-10 h-10 rounded-full' src='/l1.jpg' alt="live"/></span> Lick</Link>
                <Link className='flex gap-2 items-center' href=""><span><img className='w-10 h-10 rounded-full'  src='/l2.jpg' alt="live"/></span> Twitch</Link>
                <Link className='flex gap-2 items-center' href=""><span><img className='w-10 h-10 rounded-full'  src='/l3.jpg' alt="live"/></span> Youtube</Link>
            </div>
        </div>
    )
}
