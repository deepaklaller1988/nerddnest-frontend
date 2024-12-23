import React, { useState, useEffect } from "react";
import { GoGlobe } from "react-icons/go";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GroupPostSearch from "../SearchBar/GroupPostSearch";
import Button from "../Buttons/Button";
import PopupHeader from "../Header/PopupHeader";
import Image from "next/image";

type Group = {
  icon: string;
  name: string;
  id: any;
};

type VisibilityPopupProps = {
  toggleVisibilityPopup: () => void;
  groups: string[];
  sendSelectedIcon: any;
  selectedVisibility: any;
};

const VisibilityPopup: React.FC<VisibilityPopupProps> = ({
  toggleVisibilityPopup,
  groups,
  sendSelectedIcon,
  selectedVisibility,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showGroupPopup, setShowGroupPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [Groups, setGroups] = useState([
    { id: 1, name: "Group 1", image: "/logo.png" },
    { id: 2, name: "Group 2", image: "/logo.png" },
    { id: 3, name: "Group 3", image: "/logo.png" },
  ]);

  const visibilityOptions = [
    {
      id: "public",
      icon: <GoGlobe className="text-blue-500" />,
      name: "Public",
      title: "Public",
      description: "Visible to anyone, on or off this site",
    },
    {
      id: "all-members",
      icon: <HiOutlineUserGroup />,
      name: "Member",
      title: "All Members",
      description: "Visible to all members on this site",
    },
    {
      id: "connections",
      icon: <HiOutlineUsers />,
      name: "Friends",
      title: "Friends",
      description: "Visible only to your connections",
    },
    {
      id: "only-me",
      icon: <MdLockOutline />,
      name: "OnlyMe",
      title: "Only Me",
      description: "Visible only to you",
    },
    {
      id: "groups",
      icon: <HiOutlineUsers />,
      name: "Group",
      title: (
        <div className="flex mt-1 ml-1">
          Post in Group{" "}
          <MdOutlineKeyboardArrowRight className="ml-1 mt-0.5" size={16} />
        </div>
      ),
      description: "Visible to members of a group",
    },
  ];

  const [currentSelectedVisibility, setCurrentSelectedVisibility] = useState(selectedVisibility);

  useEffect(() => {
    if (selectedVisibility?.name) {
      setCurrentSelectedVisibility(selectedVisibility);
      if (selectedVisibility.id === "groups") {
        setSelectedGroup(selectedVisibility);
        setShowGroupPopup(false); 
      }
    }
  }, [selectedVisibility]);

  const handleVisibilitySelect = (option: any) => {
    sendSelectedIcon(option);
    if (option.id !== "groups") {
      toggleVisibilityPopup();
      setShowGroupPopup(false);
      setSelectedGroup(null); 
    }
    if (option.id === "groups") {
      setShowGroupPopup(true);
    }
  };

  const handleSave = () => {
    if (selectedGroup) {
      sendSelectedIcon(selectedGroup);
      toggleVisibilityPopup();
    } else {
      alert("Please select a group before saving.");
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
                onClick={() => handleVisibilitySelect(option)}
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
                    checked={currentSelectedVisibility?.name === option.name}
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
              <h3 className="font-semibold text-white uppercase">Select a Group</h3>
              <button
                className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white"
                onClick={() => setShowGroupPopup(false)}
              >
                &times;
              </button>
            </div>

            <div className="p-4">
              <GroupPostSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={() => setSearchTerm("")}
              />
              <ul className="space-y-4 mt-4">
                {Groups.length > 0 ? (
                  Groups.map((group: any) => (
                    <li
                      key={group.id}
                      className="rounded-lg transition-colors duration-200"
                    >
                      <label className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <Image src={group.image && group.image !== "" ? group.image : "/group-avatar-buddyboss.png"}
                            width={20} height={20} alt="Image" />
                        </div>
                        <div className="flex-grow">
                          <span className="font-medium text-white">{group.name}</span>
                        </div>
                        <input
                          type="radio"
                          id={group.id}
                          name="groupSelect"
                          checked={selectedGroup?.id === group.id}
                          onChange={() => setSelectedGroup({ icon: group.image, name: group.name, id: group.id })}
                          className="w-6 h-6 text-teal-500 focus:ring-teal-500"
                        />
                      </label>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-center">No groups found.</li>
                )}
              </ul>
            </div>

            <div className="flex gap-2 justify-end p-4 border-t border-white/5">
              <Button type="submit" label={"Back"} variant="default" onClick={() => setShowGroupPopup(false)} />
              <Button
                type="submit"
                label={"Save"}
                variant="default"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisibilityPopup;
