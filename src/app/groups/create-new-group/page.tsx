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
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <PopupHeader title={"Create A New Group"} type="group" />

      <div className="flex items-center justify-center border-b bg-gray-100">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <button
              className={`text-xs px-1 py-3 font-normal ${
                activeTab === tab.id
                  ? "text-blue-900 font-semibold"
                  : "text-[var(--highlight)] "
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
            {index < tabs.length - 1 && (
              <span
                className={`px-2 py-3 text-xs ${
                  activeTab === tab.id || activeTab === tab.id + 1
                    ? "text-blue-900"
                    : "text-gray-400"
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
        <>
          <button className="ounded-full text-xs transition duration-300 px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 ">Create Group and Continue</button>
        </>
      )}
      {activeTab !== 1 && (
        <div className="flex justify-between mt-6 p-6">
          <button
            className={`rounded-full text-xs transition duration-300 px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 ${
              activeTab === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevious}
            disabled={activeTab === 1}
          >
            Previous Step
          </button>
          <button
            className={`rounded-full text-xs transition duration-300 px-2 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 ${
              activeTab === tabs.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={activeTab === tabs.length}
          >
            Next Step
          </button>
        </div>
      )}
    </div>
  );
};

const DetailsTab = () => (
  <div className=" p-4">
    <label
      className="block mb-2 text-sm text-[var(--highlight)]"
      htmlFor="groupName"
    >
      Group Name (required)
    </label>
    <input
      id="groupName"
      type="text"
      placeholder="Enter group name"
      className="text-sm text-[var(--highlight)] w-full px-2 py-2 border rounded-md "
    />
    <label
      className="block mb-2 text-sm text-[var(--highlight)] mt-4"
      htmlFor="groupDescription"
    >
      Group Description
    </label>
    <textarea
      id="groupDescription"
      rows={2}
      placeholder="Enter group description"
      className="text-sm text-[var(--highlight)] w-full px-4 py-2 border rounded-md"
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
