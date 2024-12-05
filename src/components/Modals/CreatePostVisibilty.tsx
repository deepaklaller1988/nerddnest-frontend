import React, { useState } from "react";
import { GoGlobe } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GroupSearch from "../SearchBar/GroupSearch";
import Button from "../Buttons/Button";
import PopupHeader from "../Header/PopupHeader";
import Image from "next/image";

type VisibilityPopupProps = {
  toggleVisibilityPopup: () => void;
  groups: string[];
  setSelectedVisibility: (option: any) => void; 
  sendSelectedIcon:any
};

const VisibilityPopup: React.FC<VisibilityPopupProps> = ({
  toggleVisibilityPopup,
  groups,
  setSelectedVisibility,
  sendSelectedIcon,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showGroupPopup, setShowGroupPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode | null>(null);

  const filteredGroups = groups.filter((group) =>
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(selectedIcon,selectedGroup,"=======================")

  const visibilityOptions = [
    {
      id: "public",
      icon: <GoGlobe className="text-blue-500" />,
      name:"Globe",
      title: "Public",
      description: "Visible to anyone, on or off this site",
    },
    {
      id: "all-members",
      icon: <HiOutlineUserGroup />,
      name:"Member",
      title: "All Members",
      description: "Visible to all members on this site",
    },
    {
      id: "my-connections",
      icon: <HiOutlineUsers />,
      name:"Connections",
      title: "Friends",
      description: "Visible only to your connections",
    },
    {
      id: "only-me",
      icon: <MdLockOutline />,
      name:"OnlyMe",
      title: "Only Me",
      description: "Visible only to you",
    },
    {
      id: "post-in-group",
      icon: <HiOutlineUsers />,
      name:"Group",
      title: (
        <div className="flex mt-1 ml-1">
          Post in Group <MdOutlineKeyboardArrowRight className="ml-1 mt-0.5" size={16} />
        </div>
      ),
      description: "Visible to members of a group",
    },
  ];

  const handleVisibilitySelect = (option: any) => {
    setSelectedIcon(option.name);
    setSelectedVisibility(option.icon);
    sendSelectedIcon(option.icon); 
    if (option.id !== "post-in-group") {
      toggleVisibilityPopup(); 
    }    if (option.id === "post-in-group") {
      setShowGroupPopup(true);
    } else {
      setShowGroupPopup(false);
    }
  };

  return (
    <div className="z-50 w-[600px]">
      <div className="bg-[var(--sections)] w-full rounded-[12px] shadow-lg">
        <PopupHeader title={"Who can see your post?"} onClick={toggleVisibilityPopup} />

        <div className="p-4">
          <ul className="space-y-4">
            {visibilityOptions.map((option) => (
              <li
                key={option.id}
                className="rounded-lg transition-colors duration-200"
              >
                <label className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div className="flex-grow">
                    <span className="font-medium text-white">
                      {option.title}
                    </span>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    className="w-6 h-6 text-teal-500 focus:ring-teal-500"
                    onChange={() => handleVisibilitySelect(option)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showGroupPopup && (
        <div className="fixed inset-0 mb-4 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[var(--sections)] w-[600px] rounded-[12px] shadow-lg border border-white/5">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="font-semibold text-white uppercase">
                Select a Group
              </h3>
              <button
                className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white"
                onClick={() => setShowGroupPopup(false)}
              >
                &times;
              </button>
            </div>

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
                      className="cursor-pointer flex items-center space-x-2 hover:bg-white/5 p-2 rounded-lg"
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowGroupPopup(false);
                      }}
                    >
                      <Image src="/logo.png" height={30} width={30} alt="Group Icon" />
                      <span className="text-[white] font-medium">{group}</span>
                    </li>                    
                  ))
                ) : (
                  <li className="text-gray-500 text-center">No groups found.</li>
                )}
              </ul>
            </div>

            <div className="flex gap-2 justify-end p-4 border-t border-white/5">
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
