"use client";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiArrowRightSFill } from "react-icons/ri";

const ChatInterface = () => {
  return (
    <div className="message flex h-screen bg-gray-100 sm:w-[80%] mx-auto my-14 ">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-4 ">Messages</h2>
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
              <h3 className="text-lg font-semibold text-green-600">testing</h3>
              <p className="">Started Friday</p>
            </div>
          </div>
          <div></div>
          <BsThreeDots size={26} className="cursor-pointer" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-5 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <RiArrowRightSFill className="cursor-pointer" size={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
