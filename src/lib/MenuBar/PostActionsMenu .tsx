import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineComment, MdOutlineCommentsDisabled } from "react-icons/md";
import { RiUnpinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { RiNotificationOffLine } from "react-icons/ri";

export const PostActionsMenu = ({
  isPinned,
  togglePin,
  isCommentingEnabled,
  toggleCommenting,
  deleted,
}: {
  isPinned: boolean;
  togglePin: () => void;
  isCommentingEnabled: boolean;
  toggleCommenting: () => void;
  deleted: () => void;
}) => [
  { onClick: undefined, icon: <FaRegEdit />, label: "Edit" },
  { onClick: deleted, icon: <RiDeleteBin7Line />, label: "Delete" },
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
    onClick: undefined,
    icon: <RiNotificationOffLine />,
    label: "Turn off notifications",
  },
];
