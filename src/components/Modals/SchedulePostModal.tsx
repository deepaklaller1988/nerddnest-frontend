import React, { useState } from "react";

const SchedulePostPopup = ({ isOpen, onClose }: any) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Schedule post</h2>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <p>November 21, 2024 at 09:09 AM</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <div className="flex items-center">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="ml-2">
              <button
                className={`px-4 py-2 border rounded-md ${
                  time.includes("AM")
                    ? "bg-gray-200 text-gray-600"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => setTime("PM")}
              >
                PM
              </button>
            </div>
          </div>
        </div>
        <p>View all scheduled posts </p>
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Back
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePostPopup;
