import Connections from '@/components/core/Connections'
import Feeds from '@/components/core/Feeds'
import Groups from '@/components/core/Groups'
import LatestUpdates from '@/components/core/LatestUpdates'
import Live from '@/components/core/Live'
import Sidebar from '@/components/core/Sidebar'
import AddStory from '@/components/core/AddStory'
import React from 'react'

export default function Home() {
  return (
    <div className='w-full pt-8'>
      <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
        <div className='w-full flex gap-5'>
          <section className='flex flex-col gap-5'>
            <Sidebar />
            <Connections />
          </section>
          <section className='storiesFix'>
            <AddStory/>
            <Feeds />
          </section>
          <section className='flex flex-col gap-5'>
            <Groups />
            <LatestUpdates />
            <Live />
          </section>
        </div>
      </div>
    </div>
  )
}
