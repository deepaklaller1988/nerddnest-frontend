import React, { useState } from "react";
import { GoGlobe } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { MdLockOutline, } from "react-icons/md";
import GroupSearch from "../SearchBar/GroupSearch";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import Image from "next/image";
import Button from "../Buttons/Button";
import { BiArrowFromLeft } from "react-icons/bi";

type VisibilityPopupProps = {
  toggleVisibilityPopup: () => void;
  groups: string[];
};

const VisibilityPopup: React.FC<VisibilityPopupProps> = ({
  toggleVisibilityPopup,
  groups,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showGroupPopup, setShowGroupPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = groups.filter((group) =>
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-[var(--highlight)]">
            Who can see your post?
          </h3>
          <button
            className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-gray-800"
            onClick={toggleVisibilityPopup}
          >
            &times;
          </button>
        </div>

        <div className="p-6 ">
          <ul className="space-y-4">
            {[
              {
                id: "public",
                icon: <GoGlobe className="text-blue-500" />,
                title: "Public",
                description: "Visible to anyone, on or off this site",
              },
              {
                id: "all-members",
                icon: <HiOutlineUserGroup />,
                title: "All Members",
                description: "Visible to all members on this site",
              },
              {
                id: "my-connections",
                icon: <HiOutlineUsers />,
                title: "My Connections",
                description: "Visible only to your connections",
              },
              {
                id: "only-me",
                icon: <MdLockOutline />,
                title: "Only Me",
                description: "Visible only to you",
              },
              {
                id: "post-in-group",
                icon: <HiOutlineUsers />,
                title: (
                  <div className="flex mt-1 ml-1">
                    Post in Group <MdOutlineKeyboardArrowRight className="ml-1 mt-0.5" size={16} />
                  </div>
                ),
                description: "Visible to members of a group",
              },
            ].map((option) => (
              <li key={option.id} className="rounded-lg hover:bg-gray-200 transition-colors duration-200"
>
                <label className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div className="flex-grow">
                    <span className="font-medium text-[var(--highlight)]">
                      {option.title}
                    </span>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    className="w-6 h-6 text-teal-500 focus:ring-teal-500"
                    onChange={() =>
                      option.id === "post-in-group"
                        ? setShowGroupPopup(true)
                        : setShowGroupPopup(false)
                    }
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showGroupPopup && (
        <div className="fixed inset-0 mb-4 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-[500px] rounded-[12px] shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-[var(--highlight)]">
                Select a Group
              </h3>
              <button
                className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-gray-800"
                onClick={() => setShowGroupPopup(false)}
              >
                &times;
              </button>
            </div>

            {/* Group Search */}
            <div className="p-4">
              <GroupSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={() => setSearchTerm("")}
              />
              <ul className="mt-4 space-y-4 max-h-[300px] overflow-y-auto">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group, index) => (
                    <li
                      key={index}
                      className="cursor-pointer flex items-center space-x-4 hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowGroupPopup(false);
                      }}
                    >
                      <Image
                        src="/logo.png"
                        height={30}
                        width={30}
                        alt="Group Icon"
                      />
                      <span className="text-[var(--highlight)] font-medium">
                        {group}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-center">
                    No groups found.
                  </li>
                )}
              </ul>
            </div>

            <div className="flex gap-2 justify-end mb-4 mr-2">
              <Button type="submit" label={" Back "} variant="default" />
              <Button type="submit" label={" Save "} variant="default" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisibilityPopup;
