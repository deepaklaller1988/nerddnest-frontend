"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Select from "react-dropdown-select";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { FaFacebookMessenger } from "react-icons/fa";

type Option = {
  value: number;
  label: string;
};

const NotificationCard = () => {
  const [Values, setValues] = useState<Option[]>([]);

  const notifications = [
    {
      id: 1,
      message: 'testing replied to your post: "Happy thursday"',
      time: "a week ago",
    },
    {
      id: 2,
      message: "testing started following you",
      time: "a week ago",
    },
    {
      id: 3,
      message: "testing started following you",
      time: "a week ago",
    },
  ];

  const options: Option[] = [
    { value: 1, label: "Mark as Read" },
    { value: 2, label: "Delete" },
  ];

  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-[830px] py-3 px-4 m-auto">
        <div className="rounded-[12px] bg-[var(--sections)]">
          <div className="flex justify-between items-center border-b border-white/5 p-4 mb-4">
            <h2 className="text-xl font-semibold text-white">
              Notifications
            </h2>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-4">
                <label className="customRadio flex items-center gap-2">
                  <input type="radio" name="readStatus" />
                  <span></span> Read
                </label>
                <label className="customRadio flex items-center gap-2">
                  <input type="radio" name="readStatus" />
                  <span></span> Unread
                </label>
              </div>
              <Select
              values={Values}
                className="fixReactSelect border !border-white/5 min-w-[150px]"
                options={options}
                onChange={(values: Option[]) => setValues(values)}
              />
            </div>
          </div>

          <div className="px-4 sm:flex items-center space-x-2 mb-4 gap-3 border-b border-black/5 pb-4">
            <label className="customCheckbox">
              <input type="checkbox" />
              <span></span>
            </label>
            <Select
              values={Values}
              className="fixReactSelect border !border-white/5 min-w-[150px]"
              options={options}
              onChange={(values: Option[]) => setValues(values)}
            />
            <button className="bg-[var(--highlght-hover)] text-white rounded-[8px] px-4 py-1 h-[36px]">
              Apply
            </button>
          </div>

          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                className="flex gap-3 px-4 checkboxSelected items-center"
                key={notification.id}
              >
                <label className="customCheckbox">
                  <input type="checkbox" />
                  <span></span>
                </label>
                <div className="flex items-center justify-between duration-[.5s] cursor-pointer hover:bg-white/5 bg-white/10 rounded-md px-4 py-2 w-full">
                  <div className="flex items-center space-x-3 relative">
                    <span className="absolute">
                      <FaFacebookMessenger className="fill-yellow-500 w-5 h-5" />
                    </span>
                    <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                      <img
                        src="/dp.jpg"
                        alt="User Icon"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="">{notification.message}</p>
                      <span className="text-white text-sm">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  <div className="relative hover:z-10 showInnerDiv">
                    <button>
                      <HiDotsCircleHorizontal className="w-8 h-8 fill-white/50 hover:fill-white" />
                    </button>
                    <div className="thisInnerDiv hidden w-full min-w-[150px] overflow-y-auto overflow-x-hidden rounded-lg bg-white absolute right-0 mt-8 max-h-[500px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                      <button className="sticky bottom-0 bg-white font-semibold w-full p-4 text-center flex gap-2 items-center text-red hover:text-red/40">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-gray-500 text-sm p-4 text-center border-t border-black/5">
            Viewing 1 - {notifications.length} of {notifications.length}{" "}
            notifications
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
