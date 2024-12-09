import React, { useState } from "react";
import Button from "../Buttons/Button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import ViewAllScheduleModal from "./ViewAllScheduleModal";

const combineDateTime = (date: string, time: string, period: string) => {
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const fullDate = new Date(date);
  fullDate.setHours(hours, minutes, 0, 0);
  return fullDate.toISOString();
};

type SchedulePostPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onScheduleComplete: (scheduleTime: string) => void;
};

const SchedulePostPopup = ({ isOpen, onClose, onScheduleComplete }: SchedulePostPopupProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("AM");
  const [isViewPopupOpen, setViewPopupOpen] = useState(false);

  if (!isOpen) return null;

  const handleSchedule = () => {
    if (!date || !time) {
      alert("Please fill in both date and time.");
      return;
    }
    const scheduleTime = combineDateTime(date, time, period);
    onScheduleComplete(scheduleTime);
    onClose();
    console.log("Scheduling post for:", scheduleTime);
  };

  return (
    <div className="fixed inset-0 mb-4 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-[var(--sections)] w-[600px] rounded-[12px] shadow-lg border border-white/5">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="uppercase font-semibold text-white">
            Schedule Post
          </h3>
          <button
            className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 mb-4">
            {/* <p className="text-white">November 21, 2024 at 09:09 AM</p> */}
          </div>

          <div className="mb-4">
            <label className="mb-2 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/10 placeholder:text-[var(--foreground)] rounded-full p-[10px] w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Time</label>
            <div className="flex items-center">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white/10 placeholder:text-[var(--foreground)] rounded-full p-[10px] w-full"
              />
              <div className="ml-2 flex gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-full ${period === "AM"
                    ? "bg-[var(--highlight-blue)] text-white"
                    : "bg-[var(--foreground)] text-white"
                    }`}
                  onClick={() => setPeriod("AM")}
                >
                  AM
                </button>
                <button

                  className={`px-4 py-2 rounded-full ${period === "PM"
                    ? "bg-[var(--highlight-blue)] text-white"
                    : "bg-[var(--foreground)] text-white"
                    }`}
                  onClick={() => setPeriod("PM")}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          <div className="flex cursor-pointer" onClick={() => setViewPopupOpen(true)}>
            <p className="text-white pb-2">View all scheduled posts </p>
            <MdOutlineArrowRightAlt
              className="ml-1 mt-0.5 text-[var(--highlight)]"
              size={20}


            />
          </div>
        </div>
        <div className="border-t border-white/5 flex gap-2 justify-end p-4">
          <Button
            type="button"
            label={" Back "}
            variant="default"
            onClick={onClose}
          />
          <Button
            type="button"
            label={" Next "}
            variant="default"
            onClick={handleSchedule}
          />
        </div>


        {isViewPopupOpen && <ViewAllScheduleModal
          isViewPopupOpen={isViewPopupOpen}
          onClose={() => setViewPopupOpen(false)}
        />}
      </div>
    </div>
  );
};

export default SchedulePostPopup;
