"use client";
import React, { useState, useEffect } from "react";
import ConnectionItem from "./ConnectionsItem";
import TabContent from "./Tabcontent";

const Connections = () => {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noConnections, setNoConnections] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"friends" | "connections">("friends");

  const fetchConnections = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const data = [
          { name: "Ambros Marcos", status: "online", imageUrl: "/logo.png" },
          { name: "John Doe", status: "offline", imageUrl: "/logo.png" },
          { name: "Jane Smith", status: "online", imageUrl: "/logo.png" },
        ];

        if (data.length === 0) {
          setNoConnections(true);
        } else {
          setConnections(data);
          setNoConnections(false);
        }
      }, 1000);
    } catch (error) {
      setNoConnections(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleTabSwitch = (tab: string) => { 
    setActiveTab(tab as "friends" | "connections"); 
  };

  return (
    <TabContent
      title="FRIENDS"
      items={connections}
      isLoading={loading}
      noItemsMessage="There are no users currently available."
      tabs={[
        { label: "Online", count: connections.filter((c) => c.status === "online").length, tabName: "friends" },
        { label: "Connections", count: connections.length, tabName: "connections" },
      ]}
      onTabSwitch={handleTabSwitch}
      activeTab={activeTab}
      renderItem={(connection) => <ConnectionItem key={connection.name} {...connection} />}
      viewAllText="View All"
    />
  );
};

export default Connections;


// import React from 'react'
// import ConnectionItem from './ConnectionsItem'

// export default function Connections() {
//     return (
//         <div className='min-w-[280px] max-w-[280px] rounded-[12px] bg-white p-4'>
//             <h2 className='text-[var(--highlight)] font-semibold pb-4'>FRIENDS</h2>
//             <div className='w-full'>
//                 <section className='border-b border-gray-500/50 flex gap-4 mb-4'>
//                     <button className='activeFriends py-2 relative bottom-[-1px]'>Online <b className='font-normal'>0</b></button>
//                     <button className=' py-2 relative bottom-[-1px]'>Connections <b className='font-normal'>0</b></button>
//                 </section>
//                 <p className='pb-3'>There are no users currently online</p>
//                 <div className='w-full flex flex-col gap-3'>
//                     {/* <section className='cursor-pointer flex items-center gap-2'>
//                         <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
//                             <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
//                             <b className='absolute bg-[#45bd62] w-3 h-3 rounded-full bottom-0 right-0 border border-white'></b>
//                         </span>
//                         <p>Ambros Marcos</p>
//                     </section> */}

//                     {/* <section className='cursor-pointer flex items-center gap-2'>
//                         <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
//                             <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
//                             <b className='absolute bg-[#45bd62] w-3 h-3 rounded-full bottom-0 right-0 border border-white'></b>
//                         </span>
//                         <p>Ambros Marcos</p>
//                     </section>
//                     <section className='cursor-pointer flex items-center gap-2'>
//                         <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
//                             <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
//                             <b className='absolute bg-[#45bd62] w-3 h-3 rounded-full bottom-0 right-0 border border-white'></b>
//                         </span>
//                         <p>Ambros</p>
//                     </section>
//                     <section className='cursor-pointer flex items-center gap-2'>
//                         <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
//                             <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
//                             <b className='absolute bg-[#45bd62] w-3 h-3 rounded-full bottom-0 right-0 border border-white'></b>
//                         </span>
//                         <p>Ambros Marcos</p>
//                     </section>
//                     <section className='cursor-pointer flex items-center gap-2'>
//                         <span className='relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white'>
//                             <img className='w-full block h-full bg-cover bg-center overflow-hidden rounded-full' src='/logo.png' alt="logo" />
//                             <b className='absolute bg-[#45bd62] w-3 h-3 rounded-full bottom-0 right-0 border border-white'></b>
//                         </span>
//                         <p>Marcos</p>
//                     </section> */}
//                 </div>
//             </div>
//         </div>
//     )
// }
// Connections.tsx
