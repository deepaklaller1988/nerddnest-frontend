import React from 'react'
import { FaSearch } from "react-icons/fa";
import ButtonFunction from './ButtonFunction';
const MesssageSidebar = () => {
   
  return (
    <>
      <div className="w-1/4 bg-[var(--sections)] border-r border-white/20">
              <h2 className="text-xl font-semibold text-white p-4 py-7 pb-8">
                Messages
              </h2>
              <div className="w-full bg-white/10 border-b border-white/5 px-4 py-2 relative">
                <input
                  type="text"
                  className="w-full bg-white/0 py-2 placeholder:font-semibold placeholder:text-[var(--foreground)] pr-5"
                  placeholder="Search here..."
                />
                <button className="absolute right-7 top-5"><FaSearch /></button>
              </div>
              <div className="space-y-2 border-b border-white/5 border-r-4 hover:bg-white/5 border-r-white bg-white/10 duration-[.3s]">
                <div className="flex items-center space-x-2 p-4 cursor-pointer">
                  <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-white">
                    <img src="dp.jpg" alt="dp" />
                  </div>
                  <div className="w-full relative">
                    <p className="font-semibold text-white">Anup</p>
                    <p className="">Hii</p>
                    
                    <p className="text-xs absolute bottom-0 right-0">Tuesday</p>
                  </div>
               <ButtonFunction marginTop='20px' right='' left='150px' width='225px' height=''/>
                </div>
              </div>
              <div className="space-y-2 border-b border-white/5 border-r-4 hover:bg-white/5 bg-white/10 duration-[.3s]">
                <div className="flex items-center space-x-2 p-4 cursor-pointer">
                  <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-white">
                    <img src="dp.jpg" alt="dp" />
                  </div>
                  <div className="w-full relative">
                    <p className="font-semibold text-white">Rahul</p>
                    <p className="">Hello</p>
                    <p className="text-xs absolute bottom-0 right-0">Tuesday</p>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default MesssageSidebar