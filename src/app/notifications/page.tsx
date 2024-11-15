"use cilent";
import React from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";

const NotificationCard = () => {
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
  ];

  return (
    <div className="max-w-[80%] mx-auto bg-white shadow-lg rounded-lg p-6 my-20">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Notifications</h2>
        <select className="text-gray-600 border border-gray-300 rounded-md p-1">
          <option>View All</option>
          <option>Unread</option>
          <option>Read</option>
        </select>
      </div>

      <div className="sm:flex items-center space-x-2 mb-4 gap-3">
        <input type="checkbox" name="" id="" />

        <select className="border border-gray-300 rounded-md p-1 ">
          <option>Bulk Actions</option>
          <option>Mark as Read</option>
          <option>Delete</option>
        </select>
        <button className="bg-blue-500 text-white rounded-md px-4 py-1 hover:bg-blue-600">
          Apply
        </button>
      </div>

      <div className="space-y-4" key={"1"}>
        {notifications.map((notification) => (
          <div className="flex gap-3">
            <input type="checkbox" name="" id="" />
            <div
              key={notification.id}
              className="flex items-center justify-between bg-gray-100 rounded-md p-4 w-full"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                  <img src="user.png" alt="User Icon" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <span className="text-gray-500 text-sm">
                    {notification.time}
                  </span>
                </div>
              </div>
              <div className="flex gap-10">
                <FiEye
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  size={20}
                />
                <FiTrash2
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  size={20}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-gray-500 text-sm">
        Viewing 1 - {notifications.length} of {notifications.length}{" "}
        notifications
      </div>
    </div>
  );
};

export default NotificationCard;