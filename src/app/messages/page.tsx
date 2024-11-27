"use client";
import React from "react";
import { BiBarChartSquare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineGif, HiOutlineVideoCamera } from "react-icons/hi2";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";


const ChatInterface = () => {
  return (
    <div className="p-10 bg-white-500 border">
      <div className="message flex h-screen bg-white sm:w-[80%] mx-auto my-14 rounded-2xl overlap-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md p-4 border">
          <h2 className="text-xl font-semibold text-green-700 mb-4 ">
            Messages
          </h2>
          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full py-2 placeholder:font-semibold px-3 mb-5"
            placeholder="Search"
          />
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 bg-gray-200 rounded-lg">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold">Testing</p>
                <p className="text-xs text-gray-500">You: hii • Tuesday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-6 bg-white border-b p-4">
            <div className="flex gap-3">
              <div className="w-14">
                <img
                  src="
           user.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-600">
                  testing
                </h3>
                <p className="">Started Friday</p>
              </div>
            </div>
            <div></div>
            <BsThreeDots size={26} className="cursor-pointer" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 border">
            <div className="text-center text-gray-500 text-sm">Friday</div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm">hello</p>
                <p className="text-xs text-gray-400">4:37 AM</p>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm">Monday</div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm">hii</p>
                <p className="text-xs text-gray-400">12:25 PM</p>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm">Tuesday</div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="text-sm">hii</p>
                <p className="text-xs text-gray-400">4:51 AM</p>
              </div>
            </div>
          </div>

        
          <div className="bg-white rounded-[12px] mt-3">
            <div className="w-full">
              <section className="flex gap-4 cursor-pointer p-4">
                <div
                  // onClick={handleClick}
                  className="w-full bg-gray-200 p-2 px-5 rounded-full flex items-center text-gray-500/70"
                >
                  Write a message....
                </div>
              </section>
              <div className="flex justify-between items-center">
                <section className="border-t border-gray-500/10 p-4 flex gap-4">
                  <span className="cursor-pointer">
                    <MdOutlineLinkedCamera className="w-6 h-6 fill-green-600" />
                  </span>
                  <span className="cursor-pointer">
                    <HiOutlineVideoCamera className="w-6 h-6 stroke-yellow-500" />
                  </span>
                  <span className="cursor-pointer">
                    <IoDocumentAttachOutline className="w-6 h-6 stroke-rose-500" />
                  </span>
                  <span className="cursor-pointer">
                    <HiOutlineGif className="w-6 h-6 stroke-purple-700" />
                  </span>
                  <span className="cursor-pointer">
                    <BiBarChartSquare className="w-6 h-6 fill-black" />
                  </span>
                </section>
                <div >
                <section className="border-t border-gray-500/10 p-4 flex gap-4">
                <CiFaceSmile className="w-6 h-6 fill-green-800 mt-1"/>
                <div className="p-1 bg-blue-800 rounded">

                <IoIosSend className="w-6 h-6 fill-white"/>

                </div>
                </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
