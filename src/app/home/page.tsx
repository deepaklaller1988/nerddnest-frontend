"use client"
import React from 'react'
import Groups from '@/components/core/Groups'
import Sidebar from '@/components/Sidebar/Sidebar'
import AddStory from '@/components/Story/AddStory'
import Connections from '@/components/core/Connections'
import LatestUpdates from '@/components/core/LatestUpdates'
import FriendSuggestion from '@/components/core/FriendSuggestions'
import PostFeed from '@/components/Post/PostFeed'
import Feeds from '@/components/Post/Feeds'

export default function Home() {

  return (
    <div className='w-full pt-8'>
      <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
        <div className='w-full flex gap-5'>
          <section className='flex flex-col gap-5'>
            <Sidebar type="home" />
            <Connections />
            <FriendSuggestion />
          </section>
          <section className='storiesFix'>
            <AddStory />
            <PostFeed />
            <Feeds />
          </section>
          <section className='flex flex-col gap-5'>
            <Groups />
            <LatestUpdates />
            {/* <Live /> */}
          </section>
        </div>
      </div>
    </div>
  )
}
