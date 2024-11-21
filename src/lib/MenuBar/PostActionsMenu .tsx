import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineComment, MdOutlineCommentsDisabled } from "react-icons/md";

import { RiUnpinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiNotificationOffLine } from "react-icons/ri";

export const PostActionsMenu = (isPinned: any, togglePin: any, isCommentingEnabled: boolean, toggleCommenting: any) => [
  { onClick: "", icon: <FaRegEdit />, label: "Edit" },
  { onClick: "", icon: <RiDeleteBin7Line />, label: "Delete" },
  {
    onClick: toggleCommenting,
    icon: isCommentingEnabled ? <MdOutlineComment /> : <MdOutlineCommentsDisabled />, 
    label: isCommentingEnabled ? "Turn off commenting" : "Turn on commenting", 
  },
  {
    onClick: togglePin,
    icon: <RiUnpinLine />,
    label: isPinned ? "Unpin from Feed" : "Pin From Feed",
  },
  {
    onClick: "",
    icon: <RiNotificationOffLine />,
    label: "Turn off notifications",
  },
];
