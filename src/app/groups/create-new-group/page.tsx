// import React from "react";
// import PopupHeader from "../Header/PopupHeader";

// export default function CreateGroupForm() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//       <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-lg">
//       <PopupHeader title={"Create A New Group"} type="group"/>

//       </div>
//       <div className="bg-gray-200 p-4">

//       </div>
//     </div>
//   );
// }
"use client";
import PopupHeader from "@/components/Header/PopupHeader";
import React, { useState } from "react";
import Settings from "./settings/page";
import ForumContent from "./forum-content/page";
import Upload from "./upload/page";
import CoverTab from "./cover-tab/page";
import Invites from "./invites/page";

const CreateGroupForm = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "1. Details", content: <DetailsTab /> },
    { id: 2, label: "2. Settings", content: <SettingsTab /> },
    { id: 3, label: "3. Forum", content: <ForumTab /> },
    { id: 4, label: "4. Photo", content: <PhotoTab /> },
    { id: 5, label: "5. Cover Photo", content: <CoverPhotoTab /> },
    { id: 6, label: "6. Invites", content: <InvitesTab /> },
  ];

  const handleNext = () => {
    if (activeTab < tabs.length) setActiveTab((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (activeTab > 1) setActiveTab((prev) => prev - 1);
  };

  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-[750px] py-3 px-4 m-auto">
        <div className="w-full rounded-[12px] bg-white">
          <PopupHeader title={"Create A New Group"} type="group" />
          <div className="flex items-center justify-center border-b bg-gray-100">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button
                  className={`px-1 py-4 font-normal ${activeTab === tab.id
                      ? "text-[var(--highlight)] font-semibold"
                      : " "
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
                {index < tabs.length - 1 && (
                  <span
                    className={`px-2 py-3 text-[30px] font-light relative -top-[2px] ${activeTab === tab.id || activeTab === tab.id + 1
                        ? "text-[var(--highlight)]"
                        : ""
                      }`}
                  >
                    —
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div>{tabs[activeTab - 1].content}</div>
          {activeTab == 1 && (
            <div className="flex justify-center pb-8">
              <button className="rounded-full transition duration-300 px-4 py-3 text-white bg-[var(--highlight)]">Create Group and Continue</button>
            </div>
          )}
          {activeTab !== 1 && (
            <div className="flex justify-between mt-6 p-6 pb-8">
              <button
                className={`rounded-full transition duration-300 px-4 py-3 bg-gray-500 hover:bg-gray-800 text-white ${activeTab === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handlePrevious}
                disabled={activeTab === 1}
              >
                Previous Step
              </button>
              <button
                className={`rounded-full transition duration-300 px-4 py-3 bg-[var(--highlght-hover)] text-white ${activeTab === tabs.length ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handleNext}
                disabled={activeTab === tabs.length}
              >
                Next Step
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
  );
};

const DetailsTab = () => (
  <div className="p-6">
    <h2 className=" text-[var(--highlight)] mb-4 font-bold text-[20px]">Information</h2>
    <label
      className="block mb-2  text-black"
      htmlFor="groupName"
    >
      Group Name (required)
    </label>
    <input
      id="groupName"
      type="text"
      placeholder="Enter group name"
      className=" w-full px-4 py-3 border rounded-md "
    />
    <label
      className="block mb-2  text-black mt-4"
      htmlFor="groupDescription"
    >
      Group Description
    </label>
    <textarea
      id="groupDescription"
      rows={2}
      placeholder="Enter group description"
      className="w-full px-4 py-4 border rounded-md"
    ></textarea>
  </div>
);

const SettingsTab = () => (
  <div>
    <Settings />
  </div>
);
const ForumTab = () => (
  <div>
    <ForumContent />
  </div>
);
const PhotoTab = () => (
  <div>
    <Upload />
  </div>
);
const CoverPhotoTab = () => (
  <div>
    <CoverTab />
  </div>
);
const InvitesTab = () => (
  <div>
    <Invites />
  </div>
);

export default CreateGroupForm;
