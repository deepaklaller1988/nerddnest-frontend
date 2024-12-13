"use client"
import Connections from '@/components/core/Connections'
import Feeds from '@/components/core/Feeds'
import Groups from '@/components/core/Groups'
import LatestUpdates from '@/components/core/LatestUpdates'
import Sidebar from '@/components/core/Sidebar'
import AddStory from '@/components/core/AddStory'
import PostFeed from '@/components/core/PostFeed'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import FriendSuggestion from '@/components/core/FriendSuggestions'

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken);
      setLoading(false);  
    }
  }, []);

  useEffect(() => {
    if (!loading && !token && !pathname.startsWith("/auth")) {
      router.push("/auth/login");
    }
  }, [token, loading, pathname, router]);
  
  return (
    <div className='w-full pt-8'>
      <div className='w-full max-w-[1230px] py-3 px-4 m-auto'>
        <div className='w-full flex gap-5'>
          <section className='flex flex-col gap-5'>
            <Sidebar type="home"/>
            <Connections />
            <FriendSuggestion/>
          </section>
          <section className='storiesFix'>
            <AddStory/>
            <PostFeed/>
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
