import React, { useState } from "react";
import Button from "../Buttons/Button";
import { MdOutlineArrowRightAlt } from "react-icons/md";

type SchedulePostPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SchedulePostPopup = ({ isOpen, onClose }: SchedulePostPopupProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mb-4 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-[var(--highlight)]">
            Schedule Post
          </h3>
          <button
            className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="text-sm text-gray-500 mb-4">
            <p className="mt-2">November 21, 2024 at 09:09 AM</p>
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[var(--highlight)] mb-1">
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
            <label className="block text-md font-medium text-[var(--highlight)] mb-1">
              Time
            </label>
            <div className="flex items-center">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="ml-2 flex gap-2">
                <button
                  className={`px-4 py-2 border rounded-full ${
                    time.includes("AM")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => setTime("AM")}
                >
                  AM
                </button>
                <button
                  className={`px-4 py-2 border rounded-full ${
                    time.includes("PM")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => setTime("PM")}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          <div className="flex border-b">
            <p className="text-[var(--highlight)] ">View all scheduled posts </p>
            <MdOutlineArrowRightAlt
              className="ml-1 mt-0.5 text-[var(--highlight)]"
              size={20}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end mb-4 mr-2 ">
          <Button
            type="submit"
            label={" Back "}
            variant="default"
            onClick={onClose}
          />
          <Button type="submit" label={" Next "} variant="default" />
        </div>
      </div>
    </div>
  );
};

export default SchedulePostPopup;
