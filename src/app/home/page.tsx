"use client"
import React from 'react'
import Feeds from '@/components/core/Post/Feeds'
import Groups from '@/components/core/Groups'
import Sidebar from '@/components/core/Sidebar'
import AddStory from '@/components/core/Story/AddStory'
import Connections from '@/components/core/Connections'
import LatestUpdates from '@/components/core/LatestUpdates'
import FriendSuggestion from '@/components/core/FriendSuggestions'
import PostFeed from '@/components/core/Post/PostFeed'

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
