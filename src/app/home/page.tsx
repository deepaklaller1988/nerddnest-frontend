import Connections from '@/components/core/Connections'
import Groups from '@/components/core/Groups'
import LatestUpdates from '@/components/core/LatestUpdates'
import Live from '@/components/core/Live'
import Sidebar from '@/components/core/Sidebar'
import React from 'react'

export default function Home() {
  return (
    <div className='w-full pt-8'>
      <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
        <div className='w-full flex gap-4'>
          <section className='flex flex-col gap-4'>
            <Sidebar/>
            <Connections/>
          </section>
          <section className='flex flex-col gap-4 p-4 bg-white w-full'></section>
          <section className='flex flex-col gap-4'>
            <Groups/>
            <LatestUpdates/>
            <Live/>
          </section>
        </div>
      </div>
    </div>
  )
}
